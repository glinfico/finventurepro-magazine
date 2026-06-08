import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", to: "/magazine" },
  { label: "Markets", to: "/magazine/archive" },
  { label: "Venture", to: "/magazine/archive" },
  { label: "Archive", to: "/magazine/archive" },
  { label: "Subscribe", to: "#subscribe" },
];

export default function MagazineHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/magazine" className="group">
          <div className="font-display text-xl tracking-[0.22em] text-primary transition-opacity group-hover:opacity-80">FVP</div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">FinVenturePro</div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.to.startsWith("#") ? (
              <a key={link.label} href={link.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>
            ) : (
              <Link key={link.label} to={link.to} className={`text-sm font-medium transition-colors hover:text-foreground ${location.pathname === link.to ? "text-foreground" : "text-muted-foreground"}`}>{link.label}</Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">← GLINFICO</Link>
          <Button asChild className="rounded-full px-6">
            <a href="#subscribe">Get the Brief</a>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) =>
              link.to.startsWith("#") ? (
                <a key={link.label} href={link.to} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">{link.label}</a>
              ) : (
                <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">{link.label}</Link>
              )
            )}
            <Link to="/" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">← Back to GLINFICO</Link>
          </div>
        </div>
      )}
    </header>
  );
}