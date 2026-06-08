import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import Stripe from 'npm:stripe@14';

const PRICE_MAP = {
  "hero":              "price_1Tg8k0Ckq9BpLRgJcsTkw3JF",
  "mid-article":       "price_1Tg8k0Ckq9BpLRgJvRvzBv5m",
  "newsletter":        "price_1Tg8k0Ckq9BpLRgJSvQe7u4y",
  "sidebar":           "price_1Tg8k0Ckq9BpLRgJhJ7rSpIf",
  "footer-banner":     "price_1Tg8k0Ckq9BpLRgJFZhLOEnu",
  "category-sponsor":  "price_1Tg8k0Ckq9BpLRgJmUid8saF",
};

Deno.serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
    const { position, advertiser_name, advertiser_email, ad_headline, ad_link, slot_label, price_monthly, success_url, cancel_url } = await req.json();

    const priceId = PRICE_MAP[position];
    if (!priceId) {
      return Response.json({ error: "Invalid ad position" }, { status: 400 });
    }
    if (!advertiser_email || !advertiser_name) {
      return Response.json({ error: "Name and email required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: advertiser_email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: success_url || "https://app.base44.com?ad_success=1",
      cancel_url: cancel_url || "https://app.base44.com?ad_cancelled=1",
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
        advertiser_name,
        advertiser_email,
        slot_label,
        slot_position: position,
        price_monthly: String(price_monthly),
        ad_headline: ad_headline || "",
        ad_link: ad_link || "",
      },
    });

    // Store pending purchase record
    const base44 = createClientFromRequest(req);
    await base44.asServiceRole.entities.AdPurchase.create({
      advertiser_name,
      advertiser_email,
      slot_label,
      slot_position: position,
      price_monthly,
      stripe_session_id: session.id,
      stripe_price_id: priceId,
      payment_status: "pending",
      ad_headline: ad_headline || "",
      ad_link: ad_link || "",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createAdCheckout error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});