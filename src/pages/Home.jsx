import React from "react";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineHero from "@/components/magazine/MagazineHero";
import FeaturedArticle from "@/components/magazine/FeaturedArticle";
import IssueHighlights from "@/components/magazine/IssueHighlights";
import MarketSignal from "@/components/magazine/MarketSignal";
import SubscribePanel from "@/components/magazine/SubscribePanel";
import MagazineFooter from "@/components/magazine/MagazineFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <MagazineHeader />
      <MagazineHero />
      <FeaturedArticle />
      <IssueHighlights />
      <MarketSignal />
      <SubscribePanel />
      <MagazineFooter />
    </main>
  );
}