import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function getPayPalBase() {
  return Deno.env.get("PAYPAL_MODE") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
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
  if (!response.ok || !data.access_token) throw new Error("PayPal authentication failed.");
  return data.access_token;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const webhookId = Deno.env.get("PAYPAL_AD_WEBHOOK_ID");
    if (!webhookId) return new Response("Webhook is not configured", { status: 503 });

    const rawBody = await req.text();
    const event = JSON.parse(rawBody);
    const baseUrl = getPayPalBase();
    const token = await getPayPalToken(baseUrl);

    const verification = await fetch(baseUrl + "/v1/notifications/verify-webhook-signature", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: req.headers.get("paypal-auth-algo"),
        cert_url: req.headers.get("paypal-cert-url"),
        transmission_id: req.headers.get("paypal-transmission-id"),
        transmission_sig: req.headers.get("paypal-transmission-sig"),
        transmission_time: req.headers.get("paypal-transmission-time"),
        webhook_id: webhookId,
        webhook_event: event,
      }),
    });
    const verificationData = await verification.json();
    if (!verification.ok || verificationData.verification_status !== "SUCCESS") {
      console.error("PayPal ad webhook signature verification failed.");
      return new Response("Invalid webhook signature", { status: 400 });
    }

    const eventType = String(event.event_type || "");
    const resource = event.resource || {};
    let subscriptionId = resource.id;
    let nextStatus = null;

    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED" || eventType === "PAYMENT.SALE.COMPLETED") {
      nextStatus = "paid";
      if (eventType === "PAYMENT.SALE.COMPLETED") {
        subscriptionId = resource.billing_agreement_id || resource.subscription_id;
      }
    } else if (
      eventType === "BILLING.SUBSCRIPTION.CANCELLED" ||
      eventType === "BILLING.SUBSCRIPTION.EXPIRED"
    ) {
      nextStatus = "cancelled";
    } else if (
      eventType === "BILLING.SUBSCRIPTION.SUSPENDED" ||
      eventType === "PAYMENT.SALE.DENIED"
    ) {
      nextStatus = "failed";
      if (eventType === "PAYMENT.SALE.DENIED") {
        subscriptionId = resource.billing_agreement_id || resource.subscription_id;
      }
    } else {
      return Response.json({ received: true, ignored: true });
    }

    if (!subscriptionId) return Response.json({ received: true, ignored: true });

    const base44 = createClientFromRequest(req);
    const purchases = await base44.asServiceRole.entities.AdPurchase.filter({
      paypal_subscription_id: subscriptionId,
    });
    for (const purchase of purchases || []) {
      await base44.asServiceRole.entities.AdPurchase.update(purchase.id, {
        payment_status: nextStatus,
        paypal_subscription_status: eventType,
      });
    }

    return Response.json({ received: true, updated: (purchases || []).length });
  } catch (error) {
    console.error("PayPal ad webhook error:", error instanceof Error ? error.message : "unknown error");
    return new Response("Webhook processing failed", { status: 500 });
  }
});
