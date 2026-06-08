import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { BarChart3, FileText, Users, TrendingUp, Plus, ArrowRight, LogOut, Shield } from "lucide-react";

const statusColors = {
  Submitted: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  Matched: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  Approved: "bg-green-500/20 text-green-300 border border-green-500/30",
  Funded: "bg-primary/20 text-primary border border-primary/30",
  Declined: "bg-red-500/20 text-red-300 border border-red-500/30",
};

export default function GlinficoDashboard() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().catch(() => null).then(async (u) => {
      if (!u) {
        navigate("/portal");
        return;
      }
      setUser(u);
      // Admin sees all deals; regular users see only their own
      const dealData = u.role === "admin"
        ? await base44.entities.Deal.list("-created_date", 100)
        : await base44.entities.Deal.filter({ created_by_id: u.id }, "-created_date", 50);
      setDeals(dealData);
      setLoading(false);
    });
  }, []);

  const stats = {
    total: deals.length,
    submitted: deals.filter(d => d.status === "Submitted").length,
    approved: deals.filter(d => d.status === "Approved").length,
    funded: deals.filter(d => d.status === "Funded").length,
    totalValue: deals.reduce((s, d) => s + (d.amount_requested || 0), 0),
  };

  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-black text-white">
                Welcome, {user?.full_name?.split(" ")[0]}
              </h1>
              {isAdmin && (
                <span className="flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold text-primary">
                  <Shield className="h-3 w-3" /> ADMIN
                </span>
              )}
            </div>
            <p className="text-muted-foreground">
              {isAdmin ? "Full platform view — all deals visible" : "Your personal deal pipeline"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/submit" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:bg-primary/80 transition-all">
              <Plus className="h-4 w-4" /> Submit New Deal
            </Link>
            <button
              onClick={() => base44.auth.logout("/portal")}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-muted-foreground hover:border-white/40 hover:text-foreground transition-all"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, label: "Total Deals", value: stats.total, color: "text-blue-400" },
            { icon: TrendingUp, label: "Approved", value: stats.approved, color: "text-green-400" },
            { icon: BarChart3, label: "Funded", value: stats.funded, color: "text-primary" },
            { icon: Users, label: "Pipeline Value", value: `$${stats.totalValue.toLocaleString()}`, color: "text-purple-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-card p-6">
                <Icon className={`mb-3 h-6 w-6 ${stat.color}`} />
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Deal Room", desc: "Collaborate on active deals", href: "/deal-room" },
            { title: "Submit a Deal", desc: "Start a new deal application", href: "/submit" },
            { title: "Book a Demo", desc: "Get a personalised walkthrough", href: "/demo" },
            ...(isAdmin ? [{ title: "Contact Messages", desc: "View inbound enquiries", href: "/contact" }] : []),
          ].map((item) => (
            <Link key={item.title} to={item.href} className="group flex items-center justify-between rounded-xl border border-white/10 bg-card p-5 hover:border-primary/40 transition-all">
              <div>
                <div className="font-bold text-white group-hover:text-primary transition-colors">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>

        {/* Deals table */}
        <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
          <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 className="font-bold text-white">
              {isAdmin ? "All Deals" : "My Deals"}
            </h2>
            <Link to="/deal-room" className="text-xs font-semibold text-primary hover:underline">Open Deal Room →</Link>
          </div>

          {deals.length === 0 ? (
            <div className="p-8 text-center">
              <p className="mb-4 text-muted-foreground">No deals yet. Submit your first deal to get started.</p>
              <Link to="/submit" className="rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/80 transition-all">
                Submit a Deal
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Applicant</th>
                    {isAdmin && <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</th>}
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Deal Type</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map(deal => (
                    <tr key={deal.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{deal.applicant_name}</td>
                      {isAdmin && <td className="px-6 py-4 text-muted-foreground">{deal.company_name || "—"}</td>}
                      <td className="px-6 py-4 text-muted-foreground">{deal.deal_type}</td>
                      <td className="px-6 py-4 font-semibold text-primary">${deal.amount_requested?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[deal.status] || "bg-muted text-muted-foreground"}`}>
                          {deal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(deal.created_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <Link to="/deal-room" className="text-xs font-semibold text-primary hover:underline">View →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}