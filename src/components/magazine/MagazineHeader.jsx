import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagazineLogo from "@/components/magazine/MagazineLogo";
import NewsTicker from "@/components/magazine/NewsTicker";

const CATEGORIES = [
  { label: "Finance", to: "/magazine/archive?cat=finance" },
  { label: "Economy", to: "/magazine/archive?cat=economy" },
  { label: "Insurance", to: "/magazine/archive?cat=insurance" },
  { label: "Travel", to: "/magazine/archive?cat=travel" },
  { label: "Consulting", to: "/magazine/archive?cat=consulting" },
  { label: "Retirement", to: "/magazine/archive?cat=retirement" },
];

export default function MagazineHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const catRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQ.trim()) return;
    navigate(`/magazine/archive?search=${encodeURIComponent(searchQ.trim())}`);
    setSearchQ("");
    setSearchFocused(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 bg-[#070D18]/95 backdrop-blur-xl">
      <NewsTicker />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8 gap-4">
        {/* Logo */}
        <Link to="/magazine" className="shrink-0">
          <MagazineLogo size="sm" />
        </Link>

        {/* Desktop: Search bar (center) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-4 relative">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search articles, topics…"
              className="w-full rounded-full border border-slate-700/80 bg-slate-800/50 pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none focus:bg-slate-800/80 transition-all"
            />
          </div>
        </form>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Categories dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              Topics <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-slate-700/80 bg-[#0d1628] shadow-2xl shadow-black/60 py-1.5 z-50">
                <Link to="/magazine/archive"
                  className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                  onClick={() => setCatOpen(false)}>
                  All Articles
                </Link>
                <div className="h-px bg-slate-800 my-1" />
                {CATEGORIES.map(cat => (
                  <Link key={cat.label} to={cat.to}
                    className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                    onClick={() => setCatOpen(false)}>
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/magazine/archive" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
            Archive
          </Link>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <Link to="/magazine/profile" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
            <User className="h-4 w-4" /> Profile
          </Link>

          <Link to="/fod" className="text-xs text-slate-600 hover:text-slate-400 transition-colors px-2 hidden lg:block">← FOD</Link>

          <Button asChild className="rounded-full px-5 h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20 ml-1">
            <a href="#subscribe">Subscribe Free</a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/magazine/profile" className="text-slate-500 hover:text-white p-1.5">
            <User className="h-5 w-5" />
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-400 hover:text-white p-1.5">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#070D18] px-5 py-5 md:hidden space-y-4">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-full border border-slate-700 bg-slate-800/60 pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none"
              />
            </div>
            <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white">Go</button>
          </form>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 px-1 mb-1">Topics</p>
            {CATEGORIES.map(cat => (
              <Link key={cat.label} to={cat.to} onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
                {cat.label}
              </Link>
            ))}
            <Link to="/magazine/archive" onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
              Archive
            </Link>
            <Link to="/magazine/profile" onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-2">
              <User className="h-4 w-4" /> My Profile
            </Link>
            <Link to="/fod" onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-slate-300 transition-all">
              ← GLINFICO FOD
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}