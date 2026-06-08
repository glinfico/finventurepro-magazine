import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import Stripe from 'npm:stripe@14';

Deno.serve(async (req) => {
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return new Response("Webhook Error: " + err.message, { status: 400 });
  }

  const base44 = createClientFromRequest(req);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata || {};
    
    // Update AdPurchase record to paid
    const purchases = await base44.asServiceRole.entities.AdPurchase.filter({ stripe_session_id: session.id });
    for (const p of purchases) {
      await base44.asServiceRole.entities.AdPurchase.update(p.id, { payment_status: "paid" });
    }
    console.log("Ad purchase paid:", session.id, meta.slot_label);
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    console.log("Subscription cancelled:", sub.id);
  }

  return Response.json({ received: true });
});