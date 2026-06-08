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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 bg-[#070D18]/90 backdrop-blur-xl">
      <NewsTicker />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link to="/magazine"><MagazineLogo size="sm" /></Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.label} to={link.to}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search articles..."
                className="w-48 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none"
              />
              <button type="submit" className="text-blue-400 hover:text-blue-300"><Search className="h-4 w-4" /></button>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-slate-500 hover:text-white"><X className="h-4 w-4" /></button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-slate-500 hover:text-white transition-colors p-2">
              <Search className="h-4 w-4" />
            </button>
          )}
          <Link to="/fod" className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-2">← GLINFICO FOD</Link>
          <Button asChild className="rounded-full px-5 h-9 text-sm bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20">
            <a href="#subscribe">Subscribe Free</a>
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-slate-500 hover:text-white"><Search className="h-5 w-5" /></button>
          <button onClick={() => setOpen(!open)} aria-label="Open menu" className="text-slate-400 hover:text-white">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-b border-slate-800 bg-[#070D18] px-5 py-3 md:hidden">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              autoFocus
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white">Go</button>
          </form>
        </div>
      )}

      {open && (
        <div className="border-t border-slate-800 bg-[#070D18] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-400 hover:text-white">{link.label}</Link>
            ))}
            <Link to="/" onClick={() => setOpen(false)} className="text-sm text-slate-500 hover:text-slate-300">← GLINFICO FOD</Link>
          </div>
        </div>
      )}
    </header>
  );
}