import React from "react";
import { Link } from "react-router-dom";

const products = [
  { title: "MCA Funding", range: "$10K–$500K", detail: "24-48 hr turnaround", desc: "Merchant Cash Advances for businesses needing fast working capital. Minimal documentation, rapid approval." },
  { title: "Real Estate Capital", range: "$250K–$10M", detail: "Bridge, DSCR, CRE", desc: "Bridge loans, DSCR financing, and commercial real estate capital for investors and developers." },
  { title: "M&A Financing", range: "$1M–$25M", detail: "Acquisitions & buyouts", desc: "Structured financing for mergers, acquisitions, and leveraged buyouts with flexible terms." },
  { title: "Loan Servicing", range: "Portfolio", detail: "Performing notes", desc: "Portfolio servicing for performing notes — we manage the lifecycle from origination to payoff." },
];

export default function GlinficoProducts() {
  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black text-white">Products</h1>
          <p className="text-xl text-muted-foreground">Powerful financial tools built for every deal type.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {products.map((p) => (
            <Link key={p.title} to="/submit" className="group rounded-xl border border-white/10 bg-card p-8 hover:border-primary/50 transition-all flex flex-col">
              <h3 className="mb-1 font-black text-white group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm font-semibold text-primary">{p.range} · {p.detail}</p>
              <p className="mt-4 text-sm text-muted-foreground flex-1">{p.desc}</p>
              <div className="mt-6 text-xs font-semibold text-primary">Apply Now →</div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Return to Home</Link>
        </div>
      </div>
    </div>
  );
}