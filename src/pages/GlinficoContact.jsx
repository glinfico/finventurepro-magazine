import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function GlinficoContact() {
  const [form, setForm] = useState({ full_name: "", email: "", company: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.ContactMessage.create(form);
    setSent(true);
    setLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";

  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black text-white">
            Contact <span className="text-primary">GLINFICO</span>
          </h1>
          <p className="text-muted-foreground">Our team responds within 1 business day. For urgent matters, email us directly.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-xl border border-white/10 bg-card p-8">
            <h2 className="mb-6 text-xl font-bold text-primary">Send Us a Message</h2>
            {sent ? (
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-8 text-center">
                <div className="mb-2 text-3xl">✓</div>
                <div className="font-bold text-primary">Message sent!</div>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                    <input required className={inputClass} placeholder="Jane Smith" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                    <input required type="email" className={inputClass} placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company (optional)</label>
                  <input className={inputClass} placeholder="Acme Capital LLC" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject *</label>
                  <select required className={inputClass} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Partnership Opportunity</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Media / Press</option>
                    <option>Investor Relations</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message *</label>
                  <textarea required rows={5} className={inputClass} placeholder="How can we help you?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-card p-6">
              <h3 className="mb-4 font-bold text-primary">Direct Contact</h3>
              <div className="space-y-4">
                {[
                  { label: "General", email: "contact@glinfico.com", icon: "✉" },
                  { label: "Billing", email: "billing@glinfico.com", icon: "💳" },
                  { label: "Partnerships", email: "alain.b@glinvestco.com", icon: "🤝" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                      <a href={`mailto:${c.email}`} className="text-sm text-primary hover:underline">{c.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-6">
              <h3 className="mb-4 font-bold text-primary">Response Times</h3>
              <div className="space-y-3 text-sm">
                {[
                  ["General Inquiries", "Within 1 business day"],
                  ["Partnership Requests", "Within 2 business days"],
                  ["Technical Support", "Same business day"],
                  ["Billing Questions", "Within 4 hours"],
                ].map(([type, time]) => (
                  <div key={type} className="flex justify-between">
                    <span className="text-muted-foreground">{type}</span>
                    <span className="font-semibold text-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <p className="mb-3 text-sm text-muted-foreground">Need immediate help?</p>
              <Link to="/demo" className="rounded-lg border border-primary/60 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-all">
                Book a Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}