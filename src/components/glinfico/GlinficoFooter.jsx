import React from "react";
import { Link } from "react-router-dom";

export default function GlinficoFooter() {
  return (
    <footer className="border-t border-white/10 bg-card mt-16">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-3 text-xl font-black text-primary tracking-widest">GLINFICO</div>
            <div className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Financial Operations Division</div>
            <p className="text-sm text-muted-foreground">AI-powered platform connecting brokers, lenders, and investors.</p>
          </div>

          {/* Platform */}
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Platform</div>
            <ul className="space-y-2">
              {["Platform", "Solutions", "Products", "Pricing"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access */}
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Access</div>
            <ul className="space-y-2">
              {[
                { label: "Dashboard", to: "/dashboard" },
                { label: "Role Portal", to: "/portal" },
                { label: "Submit a Deal", to: "/submit" },
                { label: "FVP Magazine", to: "/magazine" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Legal</div>
            <ul className="space-y-2">
              {["Platform Policy", "Borrower Policy", "Broker Policy", "Investor Policy", "Lender Policy"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Compliance</div>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Use", "Disclaimer", "Success Fee Policy", "AML / Anti-Fraud"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Contact</div>
            <ul className="space-y-2">
              <li><a href="mailto:contact@glinfico.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">contact@glinfico.com</a></li>
              <li><span className="text-sm text-muted-foreground">Google Voice: 929-551-4282</span></li>
              <li><span className="text-sm text-muted-foreground">177A E. Main St. Suite #417</span></li>
              <li><span className="text-sm text-muted-foreground">New Rochelle, NY 10801</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 GLINFICO LP — Financial Operations Division. All rights reserved. · fod.glinfico.com
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="cursor-default hover:text-foreground transition-colors">Privacy Policy</span>
            <span className="cursor-default hover:text-foreground transition-colors">Terms of Use</span>
            <span className="cursor-default hover:text-foreground transition-colors">Disclaimer</span>
            <span className="cursor-default hover:text-foreground transition-colors">AML / Anti-Fraud Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}