import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SLOT_CONFIG = {
  "hero": { label: "Cover Takeover", price: 8500, planEnv: "PAYPAL_AD_PLAN_HERO" },
  "mid-article": { label: "In-Article Native Spot", price: 4200, planEnv: "PAYPAL_AD_PLAN_MID_ARTICLE" },
  "newsletter": { label: "Weekly Brief Sponsor", price: 3000, planEnv: "PAYPAL_AD_PLAN_NEWSLETTER" },
  "sidebar": { label: "Consulting Section Sponsor", price: 2800, planEnv: "PAYPAL_AD_PLAN_SIDEBAR" },
  "footer-banner": { label: "Network Footer Banner", price: 1800, planEnv: "PAYPAL_AD_PLAN_FOOTER" },
  "category-sponsor": { label: "Section Category Sponsor", price: 2200, planEnv: "PAYPAL_AD_PLAN_CATEGORY" },
};

function getPayPalBase() {
  return Deno.env.get("PAYPAL_MODE") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

function getAllowedOrigins() {
  return (Deno.env.get("AD_CHECKOUT_ALLOWED_ORIGINS") ||
    "https://finventurepro-magazine.vercel.app,https://crd.glinfico.com,https://finventurepromagazine.com")
    .split(",").map((value) => value.trim()).filter(Boolean);
}

async function getPayPalToken(baseUrl) {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const secret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  if (!clientId || !secret) throw new Error("PayPal credentials are not configured.");

  const response = await fetch(baseUrl + "/v1/oauth2/token", {
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

async function verifyPlan(baseUrl, token, planId, expectedPrice) {
  const response = await fetch(baseUrl + "/v1/billing/plans/" + encodeURIComponent(planId), {
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
  });
  const plan = await response.json();
  if (!response.ok || plan.status !== "ACTIVE") {
    throw new Error("The PayPal advertising plan is missing or inactive.");
  }

  const matchingCycle = (plan.billing_cycles || []).some((cycle) => {
    const fixedPrice = cycle.pricing_scheme && cycle.pricing_scheme.fixed_price;
    return fixedPrice && fixedPrice.currency_code === "USD" &&
      Math.round(Number(fixedPrice.value) * 100) === Math.round(expectedPrice * 100);
  });
  if (!matchingCycle) {
    throw new Error("The configured PayPal plan price does not match the advertised slot price.");
  }
}

Deno.serve(async (req) => {
  let base44;
  let purchase;
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    base44 = createClientFromRequest(req);
    const payload = await req.json();
    const {
      position,
      advertiser_name,
      advertiser_email,
      ad_headline = "",
      ad_link = "",
    } = payload || {};

    const slot = SLOT_CONFIG[position];
    if (!slot) return Response.json({ error: "Invalid advertising placement." }, { status: 400 });
    if (typeof advertiser_name !== "string" || !advertiser_name.trim() ||
        typeof advertiser_email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(advertiser_email.trim())) {
      return Response.json({ error: "A company name and valid contact email are required." }, { status: 400 });
    }

    const planId = Deno.env.get(slot.planEnv);
    if (!planId) {
      return Response.json({
        error: "PayPal is not configured for this placement yet. Please contact the magazine advertising desk.",
      }, { status: 503 });
    }

    const origin = req.headers.get("origin");
    if (!origin || !getAllowedOrigins().includes(origin)) {
      return Response.json({ error: "This website is not authorized to start advertising checkout." }, { status: 403 });
    }

    const baseUrl = getPayPalBase();
    const token = await getPayPalToken(baseUrl);
    await verifyPlan(baseUrl, token, planId, slot.price);

    purchase = await base44.asServiceRole.entities.AdPurchase.create({
      advertiser_name: advertiser_name.trim().slice(0, 160),
      advertiser_email: advertiser_email.trim().toLowerCase().slice(0, 254),
      slot_label: slot.label,
      slot_position: position,
      price_monthly: slot.price,
      payment_provider: "paypal",
      paypal_plan_id: planId,
      payment_status: "pending",
      ad_headline: typeof ad_headline === "string" ? ad_headline.trim().slice(0, 200) : "",
      ad_link: typeof ad_link === "string" ? ad_link.trim().slice(0, 2048) : "",
    });

    const response = await fetch(baseUrl + "/v1/billing/subscriptions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        plan_id: planId,
        custom_id: String(purchase.id),
        subscriber: {
          name: { given_name: advertiser_name.trim().slice(0, 100) },
          email_address: advertiser_email.trim().toLowerCase(),
        },
        application_context: {
          brand_name: "FinVenturePro",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: origin + "/magazine?ad_success=1",
          cancel_url: origin + "/magazine?ad_cancelled=1",
        },
      }),
    });

    const subscription = await response.json();
    const approvalUrl = (subscription.links || []).find((link) => link.rel === "approve")?.href;
    if (!response.ok || !subscription.id || !approvalUrl) {
      console.error("PayPal subscription create failed with status", response.status);
      await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
        payment_status: "failed",
        paypal_subscription_status: "creation_failed",
      });
      return Response.json({ error: "PayPal could not create checkout for this placement." }, { status: 502 });
    }

    await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
      paypal_subscription_id: subscription.id,
      paypal_subscription_status: subscription.status || "APPROVAL_PENDING",
    });

    return Response.json({
      url: approvalUrl,
      subscription_id: subscription.id,
      purchase_id: purchase.id,
    });
  } catch (error) {
    console.error("PayPal ad checkout error:", error instanceof Error ? error.message : "unknown error");
    if (base44 && purchase?.id) {
      try {
        await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
          payment_status: "failed",
          paypal_subscription_status: "checkout_error",
        });
      } catch (updateError) {
        console.error("Could not mark failed advertising purchase.");
      }
    }
    return Response.json({ error: "Advertising checkout could not be started. Check PayPal setup and try again." }, { status: 500 });
  }
});
