import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagazineLogo from "@/components/magazine/MagazineLogo";
import NewsTicker from "@/components/magazine/NewsTicker";

const links = [
  { label: "Finance", to: "/magazine/archive?cat=finance" },
  { label: "Economy", to: "/magazine/archive?cat=economy" },
  { label: "Insurance", to: "/magazine/archive?cat=insurance" },
  { label: "Travel", to: "/magazine/archive?cat=travel" },
  { label: "Consulting", to: "/magazine/archive?cat=consulting" },
  { label: "Retirement", to: "/magazine/archive?cat=retirement" },
  { label: "Archive", to: "/magazine/archive" },
];

export default function MagazineHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQ.trim()) return;
    navigate(`/magazine/archive?search=${encodeURIComponent(searchQ.trim())}`);
    setSearchQ("");
    setSearchOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <NewsTicker />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link to="/magazine"><MagazineLogo size="sm" /></Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.label} to={link.to}
              className={`text-sm font-medium transition-colors hover:text-foreground ${location.pathname.includes('/magazine') ? "text-muted-foreground" : "text-muted-foreground"}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {/* Search toggle */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search articles..."
                className="w-48 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none"
              />
              <button type="submit" className="text-primary hover:opacity-70"><Search className="h-4 w-4" /></button>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors p-2">
              <Search className="h-4 w-4" />
            </button>
          )}
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2">← GLINFICO FOD</Link>
          <Button asChild className="rounded-full px-5 h-9 text-sm">
            <a href="#subscribe">Subscribe Free</a>
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground"><Search className="h-5 w-5" /></button>
          <button onClick={() => setOpen(!open)} aria-label="Open menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-b border-border bg-background px-5 py-3 md:hidden">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              autoFocus
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Go</button>
          </form>
        </div>
      )}

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">{link.label}</Link>
            ))}
            <Link to="/" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">← GLINFICO FOD</Link>
          </div>
        </div>
      )}
    </header>
  );
}