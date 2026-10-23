import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function paypalBase() {
  return Deno.env.get("PAYPAL_MODE") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}
function allowedOrigins() {
  return (Deno.env.get("AD_CHECKOUT_ALLOWED_ORIGINS") ||
    "https://finventurepro-magazine.vercel.app,https://bcd.glinfico.com,https://finventurepromagazine.com")
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
  if (!response.ok || !data.access_token) throw new Error("PayPal authentication failed.");
  return data.access_token;
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
    const origin = req.headers.get("origin");
    if (!origin || !allowedOrigins().includes(origin)) {
      return Response.json({ error: "This website is not authorized to confirm advertising payments." }, { status: 403 });
    }

    const { order_id } = await req.json();
    if (typeof order_id !== "string" || !/^\w{8,64}$/.test(order_id)) {
      return Response.json({ error: "Invalid PayPal order ID." }, { status: 400 });
    }
    const base44 = createClientFromRequest(req);
    const purchases = await base44.asServiceRole.entities.AdPurchase.filter({ paypal_order_id: order_id });
    const purchase = (purchases || [])[0];
    if (!purchase) return Response.json({ error: "No advertising purchase matches this PayPal order." }, { status: 404 });
    if (purchase.payment_status === "paid") {
      return Response.json({ success: true, status: "paid", already_captured: true });
    }

    const base = paypalBase();
    const token = await getPayPalToken(base);
    const getResponse = await fetch(base + "/v2/checkout/orders/" + encodeURIComponent(order_id), {
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    });
    const existingOrder = await getResponse.json();
    if (!getResponse.ok || existingOrder.id !== order_id) {
      return Response.json({ error: "PayPal order could not be verified." }, { status: 502 });
    }
    const unit = existingOrder.purchase_units?.[0];
    if (unit?.custom_id !== String(purchase.id) || unit?.amount?.currency_code !== "USD" ||
        Math.round(Number(unit?.amount?.value) * 100) !== Math.round(Number(purchase.price_monthly) * 100)) {
      console.error("PayPal ad order did not match the saved purchase record.");
      return Response.json({ error: "PayPal order details did not match this advertising booking." }, { status: 409 });
    }

    let order = existingOrder;
    if (order.status !== "COMPLETED") {
      if (order.status !== "APPROVED") {
        await base44.asServiceRole.entities.AdPurchase.update(purchase.id, { paypal_order_status: order.status || "NOT_APPROVED" });
        return Response.json({ error: "PayPal has not approved this order for capture." }, { status: 409 });
      }
      const captureResponse = await fetch(base + "/v2/checkout/orders/" + encodeURIComponent(order_id) + "/capture", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: "{}",
      });
      order = await captureResponse.json();
      if (!captureResponse.ok) {
        console.error("PayPal ad order capture failed with status", captureResponse.status);
        return Response.json({ error: "PayPal payment could not be captured yet. Please retry or contact support." }, { status: 502 });
      }
    }

    const capture = order.purchase_units?.[0]?.payments?.captures?.find((item) => item.status === "COMPLETED");
    if (order.status !== "COMPLETED" || !capture) {
      return Response.json({ error: "PayPal has not confirmed the payment as completed." }, { status: 409 });
    }
    await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
      payment_status: "paid",
      paypal_order_status: "COMPLETED",
      paypal_capture_id: capture.id,
    });
    return Response.json({ success: true, status: "paid", capture_id: capture.id });
  } catch (error) {
    console.error("PayPal ad capture error:", error instanceof Error ? error.message : "unknown error");
    return Response.json({ error: "Could not confirm the PayPal advertising payment." }, { status: 500 });
  }
});
