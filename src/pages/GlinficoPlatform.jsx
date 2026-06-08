import React from "react";
import { Link } from "react-router-dom";

const features = [
  { title: "AI Matching Engine", sub: "Match deals to lenders instantly with AI.", to: "/dashboard" },
  { title: "Deal Pipeline Tracking", sub: "Track every deal from submission to funding.", to: "/dashboard" },
  { title: "Lender Network Access", sub: "500+ lenders across MCA, REI, M&A, and more.", to: "/dashboard" },
  { title: "Automated Workflows", sub: "Automate outreach, scoring, and term sheets.", to: "/dashboard" },
];

export default function GlinficoPlatform() {
  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black text-white">The GLINFICO Platform</h1>
          <p className="text-xl text-muted-foreground">One system connecting funding, deals, and capital.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map(({ title, sub, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-xl border border-white/10 bg-card p-8 hover:border-primary/50 transition-all flex flex-col"
            >
              <h3 className="mb-2 font-black text-white group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm text-muted-foreground flex-1">{sub}</p>
              <div className="mt-6 text-sm font-semibold text-primary">Open →</div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/dashboard" className="rounded-lg border border-primary/50 px-6 py-3 font-bold text-primary hover:bg-primary/10 transition-all inline-block">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}