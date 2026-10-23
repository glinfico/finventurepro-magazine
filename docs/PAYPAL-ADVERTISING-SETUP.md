# PayPal advertising checkout setup

This change routes **magazine advertising** through PayPal. It does not remove Stripe from other GLINFICO products or subscription flows. The old Stripe webhook remains in the repository to process any legacy Stripe advertising events already in flight.

## Required PayPal configuration

Configure these values in the Base44 function secrets for the FinVenturePro Magazine app:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_MODE` — use `sandbox` while testing; set to `live` only after approval testing.
- `PAYPAL_AD_PLAN_HERO`
- `PAYPAL_AD_PLAN_MID_ARTICLE`
- `PAYPAL_AD_PLAN_NEWSLETTER`
- `PAYPAL_AD_PLAN_SIDEBAR`
- `PAYPAL_AD_PLAN_FOOTER`
- `PAYPAL_AD_PLAN_CATEGORY`
- `PAYPAL_AD_WEBHOOK_ID`
- `AD_CHECKOUT_ALLOWED_ORIGINS` — comma-separated exact HTTPS origins for the published magazine domains.

Each `PAYPAL_AD_PLAN_*` value must be an **active PayPal billing plan ID** with a USD fixed price matching the price displayed in `MagazineAds.jsx`. Configure the correct recurring interval in PayPal itself; the newsletter slot is priced per issue, so its billing cycle must match the way that placement is sold.

## Webhook configuration

Register the Base44 `paypalAdWebhook` function as a PayPal webhook listener and subscribe it to at least:

- `BILLING.SUBSCRIPTION.ACTIVATED`
- `BILLING.SUBSCRIPTION.CANCELLED`
- `BILLING.SUBSCRIPTION.EXPIRED`
- `BILLING.SUBSCRIPTION.SUSPENDED`
- `PAYMENT.SALE.COMPLETED`
- `PAYMENT.SALE.DENIED`

Store the webhook ID in `PAYPAL_AD_WEBHOOK_ID`. The function verifies each webhook signature before updating the advertising purchase record.

## Release checklist

1. Configure sandbox credentials, active sandbox plans, and the sandbox webhook ID.
2. Verify a successful PayPal approval updates the corresponding `AdPurchase` record to `paid`.
3. Verify cancellation and denied-payment events update the purchase status correctly.
4. Test every placement and check that the plan amount matches the displayed price.
5. Confirm redirects on both success and cancellation.
6. Only then switch `PAYPAL_MODE` to `live` and configure live credentials, live plans, and the live webhook ID.

Do not commit PayPal credentials or plan secrets into the repository.
