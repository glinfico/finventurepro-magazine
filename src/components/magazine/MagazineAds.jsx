import React, { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Star, Zap, Globe, Mail, BarChart3, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

const adSlots = [
  {
    position: "hero",
    label: "Hero Banner",
    icon: Star,
    price: 2500,
    unit: "/month",
    badge: "PREMIUM",
    badgeColor: "bg-primary text-primary-foreground",
    description: "Prime above-the-fold placement on the magazine home page. Seen by every visitor before any scroll.",
    specs: "1200×300 · desktop + mobile · direct link",
    impressions: "~18,000 impressions/mo",
    available: true,
  },
  {
    position: "mid-article",
    label: "In-Article Spotlight",
    icon: BarChart3,
    price: 1200,
    unit: "/month",
    badge: "HIGH ENGAGEMENT",
    badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    description: "Inserted mid-way through every article — readers are deep in content and highly engaged.",
    specs: "600×200 · contextual placement",
    impressions: "~12,000 impressions/mo",
    available: true,
  },
  {
    position: "newsletter",
    label: "Newsletter Feature",
    icon: Mail,
    price: 900,
    unit: "/issue",
    badge: "CURATED AUDIENCE",
    badgeColor: "bg-green-500/20 text-green-300 border border-green-500/30",
    description: "Dedicated sponsor segment inside the weekly FinVenturePro intelligence brief sent to subscribers.",
    specs: "Text + logo · 120-word copy block",
    impressions: "~4,500 subscribers/issue",
    available: true,
  },
  {
    position: "footer-banner",
    label: "Footer Anchor",
    icon: Globe,
    price: 600,
    unit: "/month",
    badge: "BRAND PRESENCE",
    badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    description: "Persistent brand presence at the bottom of every page — ideal for awareness campaigns.",
    specs: "Full width · logo + tagline",
    impressions: "~22,000 impressions/mo",
    available: false,
  },
];

export default function MagazineAds() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ advertiser_name: "", advertiser_email: "", ad_headline: "", ad_link: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !form.advertiser_email || !form.advertiser_name) return;
    setLoading(true);
    await base44.entities.AdSlot.create({
      slot_name: selected.label,
      position: selected.position,
      price_monthly: selected.price,
      is_available: false,
      ...form,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="px-5 py-24 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-7xl">

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Megaphone className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Advertising</p>
            </div>
            <h2 className="font-display text-4xl tracking-[-0.05em] sm:text-5xl">Reach serious capital allocators.</h2>
            <p className="mt-4 max-w-xl text-muted-foreground leading-7">FinVenturePro readers are founders, investors, and operators actively deploying capital. Four open ad placements — priced transparently.</p>
          </div>
        </motion.div>

        {/* Ad slots grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {adSlots.map((slot, i) => {
            const Icon = slot.icon;
            return (
              <motion.div key={slot.position} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div
                  onClick={() => slot.available && setSelected(slot)}
                  className={`relative flex flex-col h-full rounded-[1.5rem] border p-6 transition-all cursor-pointer
                    ${!slot.available ? "opacity-50 cursor-not-allowed border-border" : selected?.position === slot.position ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border bg-card hover:border-primary/40 hover:-translate-y-1 hover:shadow-md"}`}
                >
                  {/* Badge */}
                  <span className={`absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${slot.badgeColor}`}>{slot.badge}</span>

                  <div className="mb-4 w-fit rounded-xl bg-secondary p-2.5"><Icon className="h-5 w-5 text-primary" /></div>
                  <h3 className="font-bold text-foreground mb-1">{slot.label}</h3>
                  <p className="text-sm text-muted-foreground leading-6 flex-1">{slot.description}</p>

                  <div className="mt-5 pt-4 border-t border-border">
                    <div className="text-2xl font-black text-foreground">${slot.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">{slot.unit}</span></div>
                    <div className="mt-1 text-xs text-muted-foreground">{slot.impressions}</div>
                    <div className="mt-1 text-xs text-muted-foreground opacity-70">{slot.specs}</div>
                    {!slot.available && <div className="mt-2 text-xs font-semibold text-muted-foreground">SOLD OUT</div>}
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

        {/* Inquiry form */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-card p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Inquiry received.</h3>
              <p className="text-muted-foreground">Our team will reach out within 48 hours with a media kit and onboarding details.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Zap className="h-6 w-6 text-primary mb-3" />
                <h3 className="text-xl font-bold">Reserve a placement</h3>
                <p className="mt-1 text-sm text-muted-foreground">{selected ? `Selected: ${selected.label} — $${selected.price.toLocaleString()}${selected.unit}` : "Select a slot above, then fill in your details."}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Company / Brand name *" value={form.advertiser_name} onChange={e => setForm({ ...form, advertiser_name: e.target.value })} required />
                  <Input type="email" placeholder="Contact email *" value={form.advertiser_email} onChange={e => setForm({ ...form, advertiser_email: e.target.value })} required />
                </div>
                <Input placeholder="Ad headline or campaign theme (optional)" value={form.ad_headline} onChange={e => setForm({ ...form, ad_headline: e.target.value })} />
                <Input placeholder="Destination URL (optional)" value={form.ad_link} onChange={e => setForm({ ...form, ad_link: e.target.value })} />
                <Button type="submit" disabled={!selected || loading} className="w-full rounded-full h-12">
                  {loading ? "Submitting..." : "Submit Ad Inquiry"}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}