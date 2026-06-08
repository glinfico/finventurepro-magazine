import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const roleOptions = ["Borrower / Applicant", "Broker / Advisor", "Lender / Bank", "Investor", "Partner / Affiliate", "Just Exploring"];
const featureOptions = [
  "AI Deal Matching Engine", "Deal Submission Flow", "Lender Portal & Term Sheets",
  "Borrower Deal Tracking", "Investor Opportunities", "Role-Based Access System",
  "Admin & Analytics Dashboard", "Insurance Automation (Coming Soon)",
];

export default function GlinficoDemo() {
  const [form, setForm] = useState({ full_name: "", email: "", company_name: "", phone: "", role: "", features_interested: [], goals: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFeature = (f) => {
    setForm(prev => ({
      ...prev,
      features_interested: prev.features_interested.includes(f)
        ? prev.features_interested.filter(x => x !== f)
        : [...prev.features_interested, f]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.DemoRequest.create(form);
    setSent(true);
    setLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";

  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Live Platform Walkthrough</div>
          <h1 className="mb-4 text-5xl font-black text-white">
            See GLINFICO FOD <span className="text-primary">In Action</span>
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Watch the platform overview, then tell us about your goals. Our team will personalise a walkthrough for your specific role.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-xl border border-white/10 bg-card p-8">
            {sent ? (
              <div className="py-8 text-center">
                <div className="mb-3 text-5xl">🎯</div>
                <h3 className="mb-2 text-xl font-bold text-primary">Demo Requested!</h3>
                <p className="text-sm text-muted-foreground">We'll reach out within 1 business day to schedule your personalised walkthrough.</p>
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-xl font-bold text-primary">Request Your Demo</h2>
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name *</label>
                      <input required className={inputClass} placeholder="Your company" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone (optional)</label>
                      <input className={inputClass} placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">I am a... *</label>
                    <select required className={inputClass} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="">Select your role</option>
                      {roleOptions.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">What would you like to see?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {featureOptions.map(f => (
                        <label key={f} className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 p-2 hover:border-primary/30 transition-all">
                          <input type="checkbox" checked={form.features_interested.includes(f)} onChange={() => toggleFeature(f)} className="accent-primary" />
                          <span className="text-xs text-muted-foreground">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tell us about your goals (optional)</label>
                    <textarea rows={3} className={inputClass} value={form.goals} onChange={e => setForm({ ...form, goals: e.target.value })} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all">
                    {loading ? "Submitting..." : "Request My Demo"}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* What to expect */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-card p-6">
              <h3 className="mb-4 font-bold text-primary">What to Expect</h3>
              <div className="space-y-4">
                {[
                  ["01", "We review your profile and role before the call"],
                  ["02", "30-minute personalised walkthrough via video call"],
                  ["03", "Live Q&A on the features relevant to you"],
                  ["04", "Account setup + onboarding assistance if you want to proceed"],
                ].map(([num, text]) => (
                  <div key={num} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{num}</span>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-6">
              <h3 className="mb-4 font-bold text-primary">Covered in the Demo</h3>
              <div className="space-y-2">
                {["AI-powered deal matching", "Role-based access portals", "Term sheet submission & tracking", "Broker commission tracking", "Borrower deal progress view", "Admin analytics console"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="mb-3 text-sm text-muted-foreground">Already have an account?</p>
              <Link to="/portal" className="rounded-lg border border-primary/50 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-all">
                Sign In to Your Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}