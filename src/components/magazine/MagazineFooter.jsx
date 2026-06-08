import React from "react";
import { Link } from "react-router-dom";
import MagazineLogo from "@/components/magazine/MagazineLogo";

export default function MagazineFooter() {
  return (
    <footer className="border-t border-slate-800/60 px-5 py-12 lg:px-8 mb-14 bg-[#040810]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <MagazineLogo size="sm" />
            <p className="mt-4 text-sm text-slate-500 leading-6">Independent editorial intelligence covering Finance, Economy, Insurance, Travel, and Business Consulting. Free to all readers.</p>
            <a href="https://fod.glinfico.com" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              GLINFICO Financial Operations Division →
            </a>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400/70">Sections</p>
            <ul className="space-y-2">
              {["finance", "economy", "insurance", "travel", "consulting", "retirement"].map(cat => (
                <li key={cat}>
                  <Link to={`/magazine/archive?cat=${cat}`} className="text-sm text-slate-500 hover:text-white capitalize transition-colors">
                    {cat === "consulting" ? "Business Consulting" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400/70">Magazine</p>
            <ul className="space-y-2">
              <li><Link to="/magazine" className="text-sm text-slate-500 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/magazine/archive" className="text-sm text-slate-500 hover:text-white transition-colors">Archive</Link></li>
              <li><a href="#subscribe" className="text-sm text-slate-500 hover:text-white transition-colors">Subscribe</a></li>
              <li><a href="#consulting" className="text-sm text-slate-500 hover:text-white transition-colors">Business Consulting AI</a></li>
              <li><a href="#ads" className="text-sm text-slate-500 hover:text-white transition-colors">Advertise</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400/70">Platform</p>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">GLINFICO FOD</Link></li>
              <li><Link to="/submit" className="text-sm text-slate-500 hover:text-white transition-colors">Submit a Deal</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-500 hover:text-white transition-colors">Dashboard</Link></li>
              <li><a href="mailto:contact@glinfico.com" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">contact@glinfico.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 FinVenturePro · A GLINFICO Publication · All rights reserved.</span>
          <span>Free to read. Always.</span>
        </div>
      </div>
    </footer>
  );
}