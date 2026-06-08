import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const roles = [
  { id: "borrower", emoji: "🏢", title: "Borrower / Applicant", desc: "Seeking funding for your business or real estate" },
  { id: "broker", emoji: "🤝", title: "Broker / Advisor", desc: "Submitting deals on behalf of clients" },
  { id: "lender", emoji: "🏦", title: "Lender / Bank", desc: "Providing capital and reviewing term sheets" },
  { id: "investor", emoji: "📈", title: "Investor", desc: "Looking for investment opportunities" },
];

export default function GlinficoSignup() {
  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm_password: "", company_name: "", phone: "" });
  const [step, setStep] = useState("otp_pending"); // "form" | "otp_pending" | "done"
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formStep, setFormStep] = useState("form"); // "form" | "otp"

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) { setError("Please select your role."); return; }
    if (form.password !== form.confirm_password) { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      await base44.auth.register({ email: form.email, password: form.password, full_name: form.full_name });
      setFormStep("otp");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await base44.auth.verifyOtp({ email: form.email, otpCode: otp });
      base44.auth.setToken(res.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-24">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white">
            JOIN <span className="text-primary">GLINFICO FOD</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Select your role, create your account, and access your personalised portal.</p>
        </div>

        {formStep === "otp" ? (
          <div className="rounded-xl border border-white/10 bg-card p-8">
            <h2 className="mb-2 text-xl font-bold text-primary">Verify Your Email</h2>
            <p className="mb-6 text-sm text-muted-foreground">We sent a verification code to <strong className="text-foreground">{form.email}</strong></p>
            {error && <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input required className={inputClass} placeholder="Enter verification code" value={otp} onChange={e => setOtp(e.target.value)} />
              <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all">
                {loading ? "Verifying..." : "Verify & Access Portal"}
              </button>
            </form>
            <button onClick={() => base44.auth.resendOtp(form.email)} className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resend code
            </button>
          </div>
        ) : (
          <>
            {/* Role selector */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${selectedRole === role.id ? "border-primary bg-primary/10" : "border-white/10 bg-card hover:border-primary/40"}`}
                >
                  <div className="mb-1 text-2xl">{role.emoji}</div>
                  <div className={`text-sm font-bold ${selectedRole === role.id ? "text-primary" : "text-white"}`}>{role.title}</div>
                  <div className="text-xs text-muted-foreground">{role.desc}</div>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-8">
              {error && <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                  <input required className={inputClass} placeholder="Jane Smith" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                  <input required type="email" className={inputClass} placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password *</label>
                    <input required type="password" className={inputClass} placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password *</label>
                    <input required type="password" className={inputClass} placeholder="Repeat password" value={form.confirm_password} onChange={e => setForm({ ...form, confirm_password: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                    <input className={inputClass} placeholder="Your company" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
                    <input className={inputClass} placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all">
                  {loading ? "Creating account..." : "Create My Account"}
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/portal" className="text-primary hover:underline">Sign in here</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}