import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Loader2, TrendingUp, Shield, Plane, BarChart3, Briefcase, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

const TOPICS = [
  { label: "Finance", icon: TrendingUp },
  { label: "Economy", icon: BarChart3 },
  { label: "Insurance", icon: Shield },
  { label: "Travel", icon: Plane },
  { label: "Consulting", icon: Briefcase },
  { label: "Retirement", icon: PiggyBank },
];

export default function MagazineSubscribe() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (label) => setInterests(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await base44.entities.Subscriber.create({ email, full_name: name, interests, source: "magazine_homepage", status: "active" });
    setLoading(false);
    setDone(true);
  };

  return (
    <section id="subscribe" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/80 to-slate-900/90 p-8 shadow-2xl shadow-blue-900/20 sm:p-12 lg:p-16 overflow-hidden">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />

          {done ? (
            <div className="text-center py-8 relative z-10">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <CheckCircle2 className="h-9 w-9 text-emerald-400" />
              </div>
              <h2 className="font-display text-4xl tracking-[-0.05em] text-white">You're in.</h2>
              <p className="mt-4 text-slate-400 max-w-md mx-auto">
                The FinVenturePro intelligence brief lands in your inbox every Friday. Free, always.
              </p>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl border border-blue-500/30 bg-blue-500/15 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-xs uppercase tracking-[0.32em] text-blue-400 font-semibold">Free Newsletter</span>
              </div>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl mb-3">
                Receive the brief<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">investors forward.</span>
              </h2>
              <p className="text-slate-400 leading-7 max-w-2xl mb-8">
                Every Friday: market maps, founder-grade analysis, retirement strategies, and private capital signals — in one elegant briefing. Free forever.
              </p>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Customize your brief (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(({ label, icon: Icon }) => (
                    <button key={label} type="button" onClick={() => toggle(label)}
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all
                        ${interests.includes(label)
                          ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20"
                          : "border-slate-700 text-slate-400 hover:border-blue-500/50 hover:text-slate-200"}`}>
                      <Icon className="h-3 w-3" /> {label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-12 rounded-full border-slate-700 bg-slate-800/60 text-white placeholder-slate-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50"
                />
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-12 rounded-full border-slate-700 bg-slate-800/60 text-white placeholder-slate-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50"
                />
                <Button type="submit" disabled={loading || !email}
                  className="h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 shrink-0 shadow-lg shadow-blue-600/30">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe Free"}
                </Button>
              </form>
              <p className="mt-4 text-xs text-slate-600">No spam. Unsubscribe any time. Free forever.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}