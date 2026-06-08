import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function GlinficoNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "Platform", to: "/platform" },
    { label: "Solutions", to: "/solutions" },
    { label: "Products", to: "/products" },
    { label: "Pricing", to: "/pricing" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center">
            <svg viewBox="0 0 40 40" className="h-9 w-9">
              <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
              <polygon points="20,8 32,14 32,26 20,32 8,26 8,14" fill="hsl(var(--accent))" opacity="0.15" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--accent))" fontSize="14" fontWeight="bold">G</text>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-widest text-white">GLINFICO</span>
            <span className="text-[9px] font-semibold tracking-widest text-muted-foreground">GLOBAL INVESTMENTS FINANCE</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === to ? "text-primary" : "text-foreground/80"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/signup" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Sign Up
          </Link>
          <Link to="/portal" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link
            to="/submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/80 transition-all"
          >
            Submit Deal
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-background/95 lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3 border-t border-white/10 pt-3">
              <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-md border border-white/20 py-2 text-center text-sm font-bold text-foreground hover:border-primary/50">Sign Up</Link>
              <Link to="/portal" onClick={() => setOpen(false)} className="flex-1 rounded-md border border-white/20 py-2 text-center text-sm font-bold text-foreground hover:border-primary/50">Sign In</Link>
              <Link to="/submit" onClick={() => setOpen(false)} className="flex-1 rounded-md bg-primary py-2 text-center text-sm font-bold text-primary-foreground">Submit Deal</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}