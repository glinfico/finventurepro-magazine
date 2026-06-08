import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";

export default function GlinficoPortal() {
  const [tab, setTab] = useState("portal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-24">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white">
            GLINFICO <span className="text-primary">ACCESS ENGINE</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your role portal or access the admin console.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-lg border border-white/10 p-1">
          <button
            onClick={() => setTab("portal")}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${tab === "portal" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Portal Login
          </button>
          <button
            onClick={() => setTab("admin")}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${tab === "admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Admin Login
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-8">
          <h2 className="mb-2 text-xl font-bold text-primary">{tab === "portal" ? "Portal Login" : "Admin Login"}</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {tab === "portal" ? "Sign in with the email and password you used when signing up." : "Admin access only. Unauthorized access is monitored."}
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <input required type="email" className={inputClass} placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <input required type="password" className={inputClass} placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-bold text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}