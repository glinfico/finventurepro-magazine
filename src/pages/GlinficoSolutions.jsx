import React from "react";
import { Link } from "react-router-dom";

const roles = [
  { title: "For Brokers", sub: "Access deals and lenders", to: "/portal" },
  { title: "For Businesses", sub: "Get funding faster", to: "/submit" },
  { title: "For Investors", sub: "Review opportunities", to: "/deal-room" },
  { title: "For Lenders", sub: "Receive better deals", to: "/portal" },
];

export default function GlinficoSolutions() {
  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black text-white">Solutions</h1>
          <p className="text-xl text-muted-foreground">Built for brokers, businesses, lenders, and investors.</p>
        </div>

        {/* FOD Portal Virtual Tour */}
        <div className="mb-12 rounded-xl border border-white/10 bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-base font-bold text-primary">FOD Portal Virtual Tour</h2>
          </div>
          <div className="aspect-video bg-black">
            <iframe
              src="https://app.heygen.com/share/vd95b3ced2f654f26a2cc1b2437d14cd1"
              className="w-full h-full"
              allow="autoplay"
              title="FOD Portal Virtual Tour"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {roles.map(({ title, sub, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-xl border border-white/10 bg-card p-8 hover:border-primary/50 transition-all flex flex-col"
            >
              <h3 className="mb-2 font-black text-white group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm text-primary">{sub}</p>
              <div className="mt-6 text-sm font-semibold text-primary">Get Started →</div>
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