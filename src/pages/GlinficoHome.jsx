import React from "react";
import { Link } from "react-router-dom";

const steps = [
  { num: "1.", title: "Submit your deal", to: "/submit" },
  { num: "2.", title: "Get matched with lenders", to: "/dashboard" },
  { num: "3.", title: "Close faster", to: "/portal" },
];

const features = [
  { title: "500+ Lenders Network", to: "/platform" },
  { title: "AI Matching Engine", to: "/dashboard" },
  { title: "Real-Time Deal Flow", to: "/dashboard" },
];

const products = [
  { title: "MCA Funding", to: "/submit" },
  { title: "Real Estate Capital", to: "/submit" },
  { title: "M&A Deals", to: "/submit" },
  { title: "Loan Servicing", to: "/contact" },
];

export default function GlinficoHome() {
  return (
    <div className="px-5 lg:px-8">
      {/* Hero */}
      <section className="mx-auto max-w-4xl py-28 text-center">
        <h1 className="mb-4 text-5xl font-black text-white lg:text-6xl">
          Where Funding Meets <span className="text-primary">Intelligence</span>
        </h1>
        <p className="mb-2 text-lg text-muted-foreground">AI-powered platform connecting brokers, lenders, and investors.</p>
        <p className="mb-10 text-base text-muted-foreground">Built for brokers, businesses, lenders, and investors looking to move capital faster.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/80 transition-all">
            Get Started
          </Link>
          <Link to="/submit" className="rounded-md border border-primary/60 px-6 py-3 font-bold text-primary hover:bg-primary/10 transition-all">
            Start Smart Funding Router
          </Link>
          <Link to="/submit" className="rounded-md border border-white/20 px-6 py-3 font-bold text-foreground hover:border-primary/50 transition-all">
            Submit a Deal
          </Link>
          <Link to="/portal" className="rounded-md border border-white/20 px-6 py-3 font-bold text-foreground hover:border-primary/50 transition-all">
            Sign In
          </Link>
          <Link to="/demo" className="rounded-md border border-white/20 px-6 py-3 font-bold text-foreground hover:border-primary/50 transition-all">
            Book a Demo
          </Link>
        </div>
      </section>

      {/* Demo Videos */}
      <section className="mx-auto max-w-7xl pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-primary">Watch Our Demos</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
            <div className="px-4 py-2 text-sm font-semibold text-muted-foreground border-b border-white/10">Demo 1</div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                src="https://app.heygen.com/embeds/b6c4f0e8d5f44a3b8e9c2d1a0f7e6b5c"
                className="w-full h-full"
                allow="autoplay"
                title="GLINFICO FOD Short Demo"
              />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
            <div className="px-4 py-2 text-sm font-semibold text-muted-foreground border-b border-white/10">Demo 2</div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                src="https://app.heygen.com/embeds/a1b2c3d4e5f64a7b8c9d0e1f2a3b4c5d"
                className="w-full h-full"
                allow="autoplay"
                title="GLINFICO DEMO2"
              />
            </div>
          </div>
        </div>

        {/* FOD Portal Virtual Tour */}
        <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-primary">FOD Portal Virtual Tour</h3>
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
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">How It Works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ num, title, to }) => (
            <Link key={title} to={to} className="group rounded-xl border border-white/10 bg-card p-6 hover:border-primary/50 transition-all flex items-center gap-4">
              <span className="text-2xl font-black text-primary">{num}</span>
              <span className="font-semibold text-white group-hover:text-primary transition-colors">{title}</span>
              <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Built for Performance */}
      <section className="mx-auto max-w-7xl pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">Built for Performance</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {features.map(({ title, to }) => (
            <Link key={title} to={to} className="group rounded-xl border border-white/10 bg-card p-6 hover:border-primary/50 transition-all flex items-center justify-between">
              <span className="font-semibold text-white group-hover:text-primary transition-colors">{title}</span>
              <span className="text-primary text-sm">Explore →</span>
            </Link>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          {products.map(({ title, to }) => (
            <Link key={title} to={to} className="group rounded-xl border border-white/10 bg-card p-6 hover:border-primary/50 transition-all flex items-center justify-between">
              <span className="font-semibold text-white group-hover:text-primary transition-colors">{title}</span>
              <span className="text-primary text-sm">Apply →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}