import React from "react";

export default function MagazineFooter() {
  return (
    <footer className="border-t border-border px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-muted-foreground md:flex-row md:items-center">
        <div>
          <div className="font-display text-lg tracking-[0.22em] text-foreground">FINVENTUREPRO</div>
          <p className="mt-2">Independent intelligence for venture, markets, and modern wealth.</p>
        </div>
        <div className="flex gap-5">
          <a href="#markets" className="hover:text-foreground">Markets</a>
          <a href="#venture" className="hover:text-foreground">Venture</a>
          <a href="#subscribe" className="hover:text-foreground">Subscribe</a>
        </div>
      </div>
    </footer>
  );
}