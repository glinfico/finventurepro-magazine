import React, { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribePanel() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section id="subscribe" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-primary p-8 text-primary-foreground shadow-2xl shadow-primary/20 sm:p-12 lg:p-16">
        <div className="mx-auto max-w-3xl text-center">
          <Mail className="mx-auto h-10 w-10 opacity-80" />
          <h2 className="mt-7 font-display text-4xl leading-tight tracking-[-0.05em] sm:text-6xl">Receive the brief investors forward.</h2>
          <p className="mt-5 text-primary-foreground/75">Every Friday: market maps, founder-grade analysis, and private capital signals in one elegant briefing.</p>
          <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-3 rounded-full bg-background p-2 sm:flex-row">
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="h-12 rounded-full border-0 bg-transparent px-5 text-foreground shadow-none focus-visible:ring-0" />
            <Button type="submit" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">Subscribe</Button>
          </form>
          {submitted && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4" /> You’re on the FinVenturePro list.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}