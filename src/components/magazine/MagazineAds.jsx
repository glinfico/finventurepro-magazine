import React, { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Star, Zap, Globe, Mail, BarChart3, CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

const adSlots = [
  {
    position: "hero",
    label: "Cover Takeover",
    icon: Star,
    price: 8500,
    unit: "/month",
    badge: "EXCLUSIVE",
    badgeColor: "bg-primary text-primary-foreground",
    description: "Full-width hero banner above all content on the magazine homepage. Maximum brand exposure for every visitor before a single scroll.",
    specs: "1400×350 · desktop + mobile · 1 advertiser only",
    impressions: "~25,000 impressions/mo",
  },
  {
    position: "mid-article",
    label: "In-Article Native Spot",
    icon: BarChart3,
    price: 4200,
    unit: "/month",
    badge: "HIGH ENGAGEMENT",
    badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    description: "Editorial-style native placement inserted at the midpoint of every article. Readers are deep in content and highly receptive.",
    specs: "Full-width native card · logo + 80-word copy + CTA",
    impressions: "~18,000 engaged reads/mo",
  },
  {
    position: "newsletter",
    label: "Weekly Brief Sponsor",
    icon: Mail,
    price: 3000,
    unit: "/issue",
    badge: "CURATED AUDIENCE",
    badgeColor: "bg-green-500/20 text-green-300 border border-green-500/30",
    description: "Exclusive sponsorship inside the FinVenturePro weekly intelligence brief. Directly in the inbox of opted-in subscribers.",
    specs: "Logo + headline + 120-word sponsor copy block",
    impressions: "~6,500 subscribers/issue",
  },
  {
    position: "sidebar",
    label: "Consulting Section Sponsor",
    icon: Zap,
    price: 2800,
    unit: "/month",
    badge: "TARGETED",
    badgeColor: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    description: "Branded placement on all Consulting and Retirement section pages and AI chat interface. Reach decision-makers seeking strategic advice.",
    specs: "300×250 · logo + tagline + link",
    impressions: "~9,000 impressions/mo",
  },
  {
    position: "footer-banner",
    label: "Network Footer Banner",
    icon: Globe,
    price: 1800,
    unit: "/month",
    badge: "BRAND PRESENCE",
    badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    description: "Persistent brand presence at the foot of every page across all six sections. Ideal for awareness and retargeting campaigns.",
    specs: "Full-width · logo + one-line tagline",
    impressions: "~30,000 impressions/mo",
  },
  {
    position: "category-sponsor",
    label: "Section Category Sponsor",
    icon: Megaphone,
    price: 2200,
    unit: "/month",
    badge: "NICHE REACH",
    badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    description: "Own an entire section — Finance, Economy, Insurance, Travel, Business Consulting, or Retirement. Sole sponsor of that category.",
    specs: "Category badge + header placement + archive listing",
    impressions: "Varies by section · avg 7,000/mo",
  },
];

export default function MagazineAds() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ advertiser_name: "", advertiser_email: "", ad_headline: "", ad_link: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!selected || !form.advertiser_email || !form.advertiser_name) return;

    if (window.self !== window.top) {
      alert("Checkout is only available from the published app. Please open the app directly to complete your purchase.");
      return;
    }

    setLoading(true);
    setError("");
    const origin = window.location.origin;

    const res = await base44.functions.invoke("createAdCheckout", {
      position: selected.position,
      advertiser_name: form.advertiser_name,
      advertiser_email: form.advertiser_email,
      ad_headline: form.ad_headline,
      ad_link: form.ad_link,
      slot_label: selected.label,
      price_monthly: selected.price,
      success_url: `${origin}/magazine?ad_success=1`,
      cancel_url: `${origin}/magazine?ad_cancelled=1`,
    });

    if (res.data?.url) {
      window.location.href = res.data.url;
    } else {
      setError(res.data?.error || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section id="ads" className="px-5 py-24 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-7xl">

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="h-5 w-5 text-primary" />
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Advertising</p>
          </div>
          <h2 className="font-display text-4xl tracking-[-0.05em] sm:text-5xl">Reach 25,000+ serious readers.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
            FinVenturePro readers are business owners, investors, and decision-makers actively managing money. Six open placements — all priced transparently. Pay monthly by card. Cancel any time.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {adSlots.map((slot, i) => {
            const Icon = slot.icon;
            return (
              <motion.div key={slot.position} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div
                  onClick={() => setSelected(slot)}
                  className={`relative flex flex-col h-full rounded-[1.5rem] border p-6 transition-all cursor-pointer
                    ${selected?.position === slot.position ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border bg-card hover:border-primary/40 hover:-translate-y-1 hover:shadow-md"}`}
                >
                  <span className={`absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide border ${slot.badgeColor}`}>{slot.badge}</span>
                  <div className="mb-4 w-fit rounded-xl bg-secondary p-2.5"><Icon className="h-5 w-5 text-primary" /></div>
                  <h3 className="font-bold text-foreground mb-1 pr-16">{slot.label}</h3>
                  <p className="text-sm text-muted-foreground leading-6 flex-1">{slot.description}</p>
                  <div className="mt-5 pt-4 border-t border-border">
                    <div className="text-2xl font-black text-foreground">${slot.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">{slot.unit}</span></div>
                    <div className="mt-1 text-xs text-muted-foreground">{slot.impressions}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground opacity-70">{slot.specs}</div>
                  </div>
                  {selected?.position === slot.position && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <CheckCircle2 className="h-4 w-4" /> Selected
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stripe Checkout form */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-card p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 border border-primary/20 p-2.5">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Reserve a Placement</h3>
              <p className="text-sm text-muted-foreground">
                {selected ? `${selected.label} — $${selected.price.toLocaleString()}${selected.unit}` : "Select a spot above, then complete checkout."}
              </p>
            </div>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Company / Brand name *" value={form.advertiser_name} onChange={e => setForm({ ...form, advertiser_name: e.target.value })} required />
              <Input type="email" placeholder="Contact email *" value={form.advertiser_email} onChange={e => setForm({ ...form, advertiser_email: e.target.value })} required />
            </div>
            <Input placeholder="Ad headline or campaign theme (optional)" value={form.ad_headline} onChange={e => setForm({ ...form, ad_headline: e.target.value })} />
            <Input placeholder="Destination URL (optional)" value={form.ad_link} onChange={e => setForm({ ...form, ad_link: e.target.value })} />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={!selected || loading || !form.advertiser_name || !form.advertiser_email} className="w-full rounded-full h-12 gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              {loading ? "Redirecting to Stripe..." : selected ? `Pay $${selected.price.toLocaleString()}${selected.unit} via Stripe` : "Select a slot to continue"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Secure payment via Stripe · Monthly subscription · Cancel any time
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}