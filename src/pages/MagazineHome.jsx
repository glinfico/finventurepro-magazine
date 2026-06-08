import React from "react";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineHero from "@/components/magazine/MagazineHero";
import FeaturedArticle from "@/components/magazine/FeaturedArticle";
import IssueHighlights from "@/components/magazine/IssueHighlights";
import MarketSignal from "@/components/magazine/MarketSignal";
import MagazineLatestGrid from "@/components/magazine/MagazineLatestGrid";
import MagazineEditorNote from "@/components/magazine/MagazineEditorNote";
import SubscribePanel from "@/components/magazine/SubscribePanel";
import MagazineFooter from "@/components/magazine/MagazineFooter";

export default function MagazineHome() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <MagazineHeader />
      <MagazineHero />
      <FeaturedArticle />
      <IssueHighlights />
      <MarketSignal />
      <MagazineLatestGrid />
      <MagazineEditorNote />
      <SubscribePanel />
      <MagazineFooter />
    </main>
  );
}