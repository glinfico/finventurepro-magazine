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
    await base44.entities.Subscriber.create({
      email,
      full_name: name,
      interests,
      source: "magazine_homepage",
      status: "active",
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <section id="subscribe" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-[2.5rem] border border-border bg-primary p-8 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-12 lg:p-16">
          {done ? (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-16 w-16 opacity-90 mb-6" />
              <h2 className="font-display text-4xl tracking-[-0.05em]">You're in.</h2>
              <p className="mt-4 text-primary-foreground/75 max-w-md mx-auto">
                The FinVenturePro intelligence brief lands in your inbox every Friday. Free, always.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-xs uppercase tracking-[0.32em] text-primary-foreground/70">Free Newsletter</span>
              </div>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl mb-3">
                Receive the brief investors forward.
              </h2>
              <p className="text-primary-foreground/70 leading-7 max-w-2xl mb-8">
                Every Friday: market maps, founder-grade analysis, retirement strategies, and private capital signals — in one elegant briefing. Free forever.
              </p>

              {/* Topic interests */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-3">Customize your brief (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(({ label, icon: Icon }) => (
                    <button key={label} type="button" onClick={() => toggle(label)}
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all
                        ${interests.includes(label) ? "bg-primary-foreground text-primary border-primary-foreground" : "border-primary-foreground/30 text-primary-foreground/70 hover:border-primary-foreground/60"}`}>
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
                  className="h-13 rounded-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                />
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-13 rounded-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                />
                <Button type="submit" disabled={loading || !email}
                  className="h-13 rounded-full bg-primary-foreground text-primary font-bold px-8 hover:opacity-90 shrink-0">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe Free"}
                </Button>
              </form>
              <p className="mt-4 text-xs text-primary-foreground/50">No spam. Unsubscribe any time. Free forever.</p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}