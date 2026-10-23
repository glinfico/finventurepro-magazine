# CRD advertising checkout — reuse the FOD PayPal Orders API

CRD magazine advertising now follows the same PayPal Orders API pattern already used by FOD. It uses the same PayPal REST API credentials **by environment variable name**; it does not hardcode the account, Client ID, or secret.

## Payment model

Each click creates a **one-time payment** for the displayed placement period (one month for monthly placements, or one issue for the newsletter slot). There is no automatic renewal in this Orders API flow. The advertiser books and pays for another period when needed.

This differs from a recurring PayPal Billing Subscription. The currently inspected FOD `paypalCheckout` creates an Order using `/v2/checkout/orders` and `intent: CAPTURE`; it does not create a recurring subscription or include an order-capture endpoint in that file. CRD therefore includes a capture endpoint so payment is not marked paid merely because the customer returned from PayPal.

## Required runtime configuration

In the magazine backend runtime, reuse the PayPal app credentials that are authorized for GLINFICO's account:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_MODE=sandbox` for testing; use `live` only after a successful sandbox test and configuration review.
- `AD_CHECKOUT_ALLOWED_ORIGINS` with the exact production HTTPS origins.

Credentials must remain in the backend secrets/environment, never in frontend code or GitHub. The values need to be configured in the runtime used by the magazine functions; having them in FOD does not itself prove that a separate runtime can read them.

## Functions

- `createAdCheckout` validates the placement and creates a PayPal Orders API order.
- `captureAdCheckout` finds the pending purchase, verifies the PayPal order/amount/custom ID against the saved booking, captures it, and only marks it paid after PayPal reports a completed capture.

## Test checklist

1. Run an end-to-end test in PayPal Sandbox.
2. Test success, cancellation, repeat return/capture, and a failed/unapproved order.
3. Confirm the saved purchase amount and PayPal capture ID.
4. Confirm each displayed price describes exactly the booked period.
5. Configure live credentials in the actual backend runtime and test a small live payment only after review.
