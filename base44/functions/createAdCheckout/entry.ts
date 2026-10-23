import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SLOT_CONFIG = {
  "hero": { label: "Cover Takeover", price: 8500, term: "one month" },
  "mid-article": { label: "In-Article Native Spot", price: 4200, term: "one month" },
  "newsletter": { label: "Weekly Brief Sponsor", price: 3000, term: "one issue" },
  "sidebar": { label: "Consulting Section Sponsor", price: 2800, term: "one month" },
  "footer-banner": { label: "Network Footer Banner", price: 1800, term: "one month" },
  "category-sponsor": { label: "Section Category Sponsor", price: 2200, term: "one month" },
};

function paypalBase() {
  return Deno.env.get("PAYPAL_MODE") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

function allowedOrigins() {
  return (Deno.env.get("AD_CHECKOUT_ALLOWED_ORIGINS") ||
    "https://finventurepro-magazine.vercel.app,https://crd.glinfico.com,https://finventurepromagazine.com")
    .split(",").map((value) => value.trim()).filter(Boolean);
}

async function getPayPalToken(base) {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const secret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  if (!clientId || !secret) throw new Error("PayPal credentials are not configured.");

  const response = await fetch(base + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(clientId + ":" + secret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    console.error("PayPal token request failed with status", response.status);
    throw new Error("PayPal authentication failed.");
  }
  return data.access_token;
}

Deno.serve(async (req) => {
  let base44;
  let purchase;
  try {
    if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
    base44 = createClientFromRequest(req);
    const payload = await req.json();
    const { position, advertiser_name, advertiser_email, ad_headline = "", ad_link = "" } = payload || {};
    const slot = SLOT_CONFIG[position];

    if (!slot) return Response.json({ error: "Invalid advertising placement." }, { status: 400 });
    if (typeof advertiser_name !== "string" || !advertiser_name.trim() ||
        typeof advertiser_email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(advertiser_email.trim())) {
      return Response.json({ error: "A company name and valid contact email are required." }, { status: 400 });
    }

    const origin = req.headers.get("origin");
    if (!origin || !allowedOrigins().includes(origin)) {
      return Response.json({ error: "This website is not authorized to start advertising checkout." }, { status: 403 });
    }

    const base = paypalBase();
    const token = await getPayPalToken(base);
    purchase = await base44.asServiceRole.entities.AdPurchase.create({
      advertiser_name: advertiser_name.trim().slice(0, 160),
      advertiser_email: advertiser_email.trim().toLowerCase().slice(0, 254),
      slot_label: slot.label,
      slot_position: position,
      price_monthly: slot.price,
      payment_provider: "paypal",
      payment_status: "pending",
      paypal_order_status: "CREATING",
      ad_headline: typeof ad_headline === "string" ? ad_headline.trim().slice(0, 200) : "",
      ad_link: typeof ad_link === "string" ? ad_link.trim().slice(0, 2048) : "",
    });

    const response = await fetch(base + "/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: String(purchase.id),
          custom_id: String(purchase.id),
          description: slot.label + " — " + slot.term + " advertising placement",
          amount: { currency_code: "USD", value: slot.price.toFixed(2) },
        }],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              landing_page: "LOGIN",
              user_action: "PAY_NOW",
              return_url: origin + "/magazine?ad_success=1",
              cancel_url: origin + "/magazine?ad_cancelled=1",
            },
          },
        },
      }),
    });

    const order = await response.json();
    const approvalUrl = (order.links || []).find((link) => link.rel === "payer-action")?.href;
    if (!response.ok || !order.id || !approvalUrl) {
      console.error("PayPal ad order creation failed with status", response.status);
      await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
        payment_status: "failed",
        paypal_order_status: "CREATE_FAILED",
      });
      return Response.json({ error: "PayPal could not create checkout for this placement." }, { status: 502 });
    }

    await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
      paypal_order_id: order.id,
      paypal_order_status: order.status || "CREATED",
    });
    return Response.json({ url: approvalUrl, order_id: order.id, purchase_id: purchase.id });
  } catch (error) {
    console.error("PayPal ad checkout error:", error instanceof Error ? error.message : "unknown error");
    if (base44 && purchase?.id) {
      try {
        await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
          payment_status: "failed",
          paypal_order_status: "CREATE_ERROR",
        });
      } catch (_) {
        console.error("Could not mark failed advertising purchase.");
      }
    }
    return Response.json({ error: "Advertising checkout could not be started. Check PayPal setup and try again." }, { status: 500 });
  }
});
