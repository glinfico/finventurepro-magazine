import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const dealTypes = ["MCA Funding", "Real Estate Capital", "M&A Financing", "Loan Servicing"];
const timeOptions = ["Less than 1 year", "1-2 years", "2-5 years", "5+ years"];
const creditOptions = ["Below 500", "500-580", "580-650", "650-700", "700-750", "750+"];

export default function GlinficoSubmit() {
  const [form, setForm] = useState({
    applicant_name: "", company_name: "", email: "", phone: "",
    deal_type: "", amount_requested: "", business_description: "",
    monthly_revenue: "", time_in_business: "", credit_score: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Deal.create({
      ...form,
      amount_requested: parseFloat(form.amount_requested) || 0,
      monthly_revenue: parseFloat(form.monthly_revenue) || 0,
      status: "Submitted",
    });
    setSubmitted(true);
    setLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl">🎯</div>
          <h2 className="mb-3 text-3xl font-black text-white">Deal Submitted!</h2>
          <p className="mb-8 text-muted-foreground">Our AI engine is now matching your deal with the best lenders in our network. You'll hear back within 24-48 hours.</p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/80 transition-all">View Dashboard</Link>
            <Link to="/" className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-foreground hover:border-white/40 transition-all">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Smart Funding Router</div>
          <h1 className="mb-4 text-5xl font-black text-white">Submit a Deal</h1>
          <p className="text-muted-foreground">Fill out the form below and our AI engine will match you with the right lenders instantly.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Applicant Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                  <input required className={inputClass} placeholder="Jane Smith" value={form.applicant_name} onChange={e => setForm({ ...form, applicant_name: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                  <input className={inputClass} placeholder="Acme LLC" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                  <input required type="email" className={inputClass} placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
                  <input className={inputClass} placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Deal Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deal Type *</label>
                  <select required className={inputClass} value={form.deal_type} onChange={e => setForm({ ...form, deal_type: e.target.value })}>
                    <option value="">Select deal type</option>
                    {dealTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount Requested *</label>
                  <input required type="number" className={inputClass} placeholder="e.g. 250000" value={form.amount_requested} onChange={e => setForm({ ...form, amount_requested: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly Revenue</label>
                  <input type="number" className={inputClass} placeholder="e.g. 50000" value={form.monthly_revenue} onChange={e => setForm({ ...form, monthly_revenue: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time in Business</label>
                  <select className={inputClass} value={form.time_in_business} onChange={e => setForm({ ...form, time_in_business: e.target.value })}>
                    <option value="">Select</option>
                    {timeOptions.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Credit Score Range</label>
                  <select className={inputClass} value={form.credit_score} onChange={e => setForm({ ...form, credit_score: e.target.value })}>
                    <option value="">Select</option>
                    {creditOptions.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Description</label>
              <textarea rows={4} className={inputClass} placeholder="Describe your business, the purpose of the funds, and any additional context..." value={form.business_description} onChange={e => setForm({ ...form, business_description: e.target.value })} />
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-4 font-black text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all">
              {loading ? "Submitting..." : "🚀 Submit Deal to GLINFICO Network"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}