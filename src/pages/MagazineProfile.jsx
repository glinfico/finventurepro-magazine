import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineFooter from "@/components/magazine/MagazineFooter";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { User, Mail, BookOpen, Star, Clock, ArrowRight, Bookmark, Settings, LogOut, ExternalLink } from "lucide-react";
import AdminArticleEditor from "@/components/magazine/AdminArticleEditor";

const INTERESTS = [
  { key: "finance", label: "Finance" },
  { key: "economy", label: "Economy" },
  { key: "insurance", label: "Insurance" },
  { key: "travel", label: "Travel" },
  { key: "consulting", label: "Business Consulting" },
  { key: "retirement", label: "Retirement" },
];

const RECENT_ARTICLES = [
  { slug: "personal-finance-101", title: "Building Wealth on Any Income", section: "Finance", read_time: "9 min" },
  { slug: "inflation-decoded", title: "Inflation Decoded: What the Numbers Never Tell You", section: "Economy", read_time: "7 min" },
  { slug: "consulting-growth", title: "The Five-Question Framework Before Scaling", section: "Consulting", read_time: "11 min" },
];

export default function MagazineProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", interests: [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.auth.me()
      .then(u => {
        setUser(u);
        setForm({ full_name: u?.full_name || "", interests: u?.interests || [] });
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const toggleInterest = (key) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(key)
        ? f.interests.filter(k => k !== key)
        : [...f.interests, key],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe({ full_name: form.full_name, interests: form.interests });
    setUser(u => ({ ...u, ...form }));
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => base44.auth.logout("/magazine");

  return (
    <main className="min-h-screen bg-[#070D18] text-white">
      <MagazineHeader />

      {/* FOD banner */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-blue-950/95 backdrop-blur border-t border-blue-500/20 py-2.5 px-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-white hidden sm:block">Need capital? GLINFICO Financial Operations Division — fast access to MCA, real estate, and M&amp;A funding.</p>
          <p className="text-sm font-semibold text-white sm:hidden">GLINFICO FOD — Fast capital access.</p>
          <a href="https://fod.glinfico.com" target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-900 hover:opacity-90 transition-opacity">
            fod.glinfico.com <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="px-5 pt-40 pb-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="h-8 w-8 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
            </div>
          ) : !user ? (
            <div className="text-center py-32">
              <User className="mx-auto h-14 w-14 text-slate-600 mb-6" />
              <h2 className="text-2xl font-semibold text-white mb-3">Sign in to view your profile</h2>
              <p className="text-slate-500 mb-8">Track your reading, manage interests, and personalize your experience.</p>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                Sign In <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Profile Header */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-5">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-600/30">
                    {(user.full_name || user.email || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{user.full_name || "Reader"}</h1>
                    <p className="text-slate-400 flex items-center gap-1.5 mt-1"><Mail className="h-3.5 w-3.5" /> {user.email}</p>
                    <span className="mt-2 inline-block rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-0.5 text-xs font-semibold text-blue-300">
                      {user.role === "admin" ? "Editor / Admin" : "FinVenturePro Reader"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                    <Settings className="h-4 w-4" /> Edit Profile
                  </button>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-600 hover:text-red-400 hover:border-red-500/30 transition-all">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </motion.div>

              {/* Edit Form */}
              {editing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 space-y-5">
                  <h3 className="text-base font-semibold text-white">Edit Profile</h3>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Display Name</label>
                    <input
                      value={form.full_name}
                      onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-3">Editorial Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map(i => (
                        <button key={i.key} onClick={() => toggleInterest(i.key)}
                          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${form.interests.includes(i.key) ? "bg-blue-600 text-white" : "border border-slate-700 text-slate-400 hover:border-blue-500/40 hover:text-white"}`}>
                          {i.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving}
                      className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-all disabled:opacity-60">
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="rounded-full border border-slate-700 px-6 py-2 text-sm text-slate-400 hover:text-white transition-all">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {saved && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-5 py-3 text-sm text-emerald-300">
                  Profile updated successfully.
                </motion.div>
              )}

              {/* Stats Row */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Articles Read", value: "—", icon: BookOpen },
                  { label: "Bookmarks", value: "—", icon: Bookmark },
                  { label: "Interests", value: (user.interests?.length || 0).toString(), icon: Star },
                  { label: "Member Since", value: user.created_date ? new Date(user.created_date).getFullYear() : "—", icon: Clock },
                ].map(stat => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-2">
                    <stat.icon className="h-5 w-5 text-blue-400" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Interests */}
              {user.interests?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Star className="h-4 w-4 text-blue-400" /> Your Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map(k => {
                      const found = INTERESTS.find(i => i.key === k);
                      return (
                        <Link key={k} to={`/magazine/archive?cat=${k}`}
                          className="rounded-full bg-blue-500/15 border border-blue-500/30 px-4 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/25 transition-all">
                          {found?.label || k}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Admin: Article Manager */}
              {user.role === "admin" && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <AdminArticleEditor />
                </motion.div>
              )}

              {/* Suggested Reading */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><BookOpen className="h-4 w-4 text-blue-400" /> Suggested for You</h3>
                <div className="space-y-3">
                  {RECENT_ARTICLES.map(a => (
                    <Link key={a.slug} to={`/magazine/article/${a.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-800/40 px-4 py-3 hover:border-blue-500/30 hover:bg-slate-800/70 transition-all">
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors leading-snug">{a.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{a.section} · {a.read_time}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-blue-400 shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <MagazineFooter />
    </main>
  );
}