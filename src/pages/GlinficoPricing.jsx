import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Perfect for new brokers and small operators entering the funding space.",
    features: ["25 leads/month", "Basic CRM access", "Standard lender matching", "Email support"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    desc: "Built for active brokers looking to scale deal flow and lender access.",
    features: ["100 leads/month", "Advanced CRM tools", "Priority lender routing", "Pipeline dashboard"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    desc: "The complete funding operating system for serious dealmakers.",
    features: ["Unlimited leads", "Full MCA + REI + M&A access", "AI scoring & matching", "Marketplace visibility", "White-label options"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams, institutions, and strategic funding operations.",
    features: ["Dedicated onboarding", "Custom workflows", "API integrations", "Multi-user access", "Priority infrastructure"],
    highlight: false,
    cta: "Contact Sales",
    ctaHref: "/contact",
  },
];

export default function GlinficoPricing() {
  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black text-white">Simple Pricing. Powerful Results.</h1>
          <p className="text-xl text-muted-foreground">Choose the plan that fits your growth.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 flex flex-col transition-all ${
                plan.highlight
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-white/10 bg-card hover:border-primary/30"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`mb-1 text-lg font-black ${plan.highlight ? "text-primary" : "text-white"}`}>{plan.name}</h3>
                <div className="mb-3 flex items-end gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-muted-foreground pb-1">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.desc}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaHref || "/signup"}
                className={`rounded-lg px-4 py-3 text-center text-sm font-bold transition-all ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "border border-white/20 text-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {plan.cta || "Get Started"}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Return to Home</Link>
        </div>
      </div>
    </div>
  );
}