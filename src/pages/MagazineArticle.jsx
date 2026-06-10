import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineFooter from "@/components/magazine/MagazineFooter";
import MagazineLogo from "@/components/magazine/MagazineLogo";
import SubscribePanel from "@/components/magazine/SubscribePanel";
import { ArrowLeft, Clock, BookOpen, Share2, BarChart3, Briefcase, Globe2, TrendingUp, Landmark, DollarSign, ShieldCheck, Plane, ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";

const articles = {
  "private-market-os": {
    slug: "private-market-os",
    section: "Cover Story",
    category: "markets",
    icon: Landmark,
    title: "The New Private Market Operating System",
    subtitle: "How top-tier investors are replacing quarterly intuition with live underwriting systems",
    readTime: "14 min read",
    date: "June 2026",
    author: "Editorial Team",
    tags: ["Venture Capital", "LP Strategy", "Macro"],
    intro: "Top-tier investors are replacing quarterly intuition with live underwriting systems, operator networks, and sector-specific intelligence loops.",
    body: [
      {
        heading: "The Shift From Instinct to Infrastructure",
        content: "For decades, private market investing was governed by conviction born of relationship and proprietary deal access. The GP who had dinner with the founder last Tuesday held an edge. But that edge has been eroding. As capital supply has surged and deal cycles have compressed, the advantage has migrated from access to analysis speed — and from instinct to infrastructure."
      },
      {
        heading: "Live Underwriting Systems",
        content: "The most sophisticated emerging managers are now deploying what practitioners call 'live underwriting' — a continuous data pipeline that updates portfolio thesis in near real-time. Rather than a static diligence deck frozen at closing, live underwriting pulls revenue data from portfolio companies, cross-references sector benchmarks, and flags deviation before a quarterly board meeting would surface it."
      },
      {
        heading: "The Operator Network Advantage",
        content: "Family offices and multi-strategy GPs are rebuilding around operator networks — deep benches of sector executives who provide ground-level intelligence on specific verticals. A single ex-CTO of a hyperscaler on retainer is worth more than three analysts pulling secondary data. The intelligence loop matters most at the intersection of timing and conviction."
      },
      {
        heading: "What This Means for LPs",
        content: "Limited partners are now evaluating managers not just on track record but on systematic edge. Due diligence questionnaires increasingly ask: what is your data moat? How do you maintain underwriting discipline across a compressed cycle? The answers separate the operationally mature from the merely fortunate."
      },
      {
        heading: "Looking Ahead",
        content: "The private market OS is not a product — it is a posture. It requires building systems before they are needed, hiring for analytical discipline before returns demand it, and refusing to let narrative override data. The managers who build this infrastructure quietly, cycle after cycle, will compound in ways that are difficult to reverse-engineer from a performance chart alone."
      }
    ]
  },
  "credit-spreads-dry-powder": {
    slug: "credit-spreads-dry-powder",
    section: "Markets",
    category: "markets",
    icon: BarChart3,
    title: "Credit Spreads, Dry Powder, and the Return of Price Discipline",
    subtitle: "Why the market's most important reset is happening in credit, not equity",
    readTime: "8 min read",
    date: "June 2026",
    author: "Markets Desk",
    tags: ["Credit", "Fixed Income", "Macro"],
    intro: "After two years of compressed spreads and irrational covenant structures, the credit market is quietly reasserting discipline. For prepared allocators, this is not a warning — it is a signal.",
    body: [
      {
        heading: "The Compression Era Is Over",
        content: "Between 2021 and 2023, credit spreads across the BB and B spectrum compressed to levels that rewarded issuers and penalized buyers. The result was a decade of future return pulled forward into the present. That era appears to be closing. Spreads across leveraged loans and high-yield bonds have widened meaningfully in the past two quarters, and covenant quality — a leading indicator of lender confidence — is beginning to recover."
      },
      {
        heading: "Dry Powder at a Crossroads",
        content: "Private credit managers are sitting on record levels of uncalled capital. The question is no longer whether to deploy but when. The most disciplined GPs are holding cash into a repricing environment, accepting short-term performance drag in exchange for entry prices that reflect realistic risk premiums."
      },
      {
        heading: "Price Discipline Returns",
        content: "The return of price discipline in credit is perhaps the most significant structural development in private markets since the post-GFC rebuilding period. Borrowers who grew accustomed to issuer-friendly terms are facing renewed scrutiny. Lenders who maintained underwriting standards through the compression era are now positioned to compound that discipline into superior vintage performance."
      }
    ]
  },
  "founder-led-funds": {
    slug: "founder-led-funds",
    section: "Venture",
    category: "venture",
    icon: Briefcase,
    title: "Founder-Led Funds Are Becoming the New Specialist Boutiques",
    subtitle: "The rise of operator-turned-investor is reshaping early-stage VC dynamics",
    readTime: "11 min read",
    date: "June 2026",
    author: "Venture Desk",
    tags: ["Venture Capital", "Fund Strategy", "Founders"],
    intro: "A new class of manager is emerging at the intersection of operational expertise and investment discipline. Founder-led funds are not just a trend — they are becoming the dominant force in specialist early-stage markets.",
    body: [
      {
        heading: "Why Founders Make Different GPs",
        content: "The fundamental insight is simple: operators who have scaled companies know what they are looking for in other operators. They evaluate team resilience, product intuition, and GTM creativity not from theoretical frameworks but from hard-won pattern recognition. The result is a diligence process that can distinguish between founders who sound good and founders who will execute."
      },
      {
        heading: "The Boutique Advantage",
        content: "Founder-led funds typically operate with smaller check sizes and deeper conviction. A $50M fund writing $500K checks across 40 companies is behaving more like a specialist boutique than a diversified growth allocator. The concentration of sector expertise — often one or two industries per fund — produces sourcing advantages that are genuinely difficult to replicate at scale."
      },
      {
        heading: "Challenges of the Model",
        content: "The primary challenge is sequencing. Successful founders command significant attention from their portfolio companies, from LPs, and from deal flow networks simultaneously. The bandwidth problem is real, and many emerging managers underestimate how different fund management is from company building. The best founder-GPs solve this by hiring operationally strong platform teams early."
      }
    ]
  },
  "family-office-coinvestment": {
    slug: "family-office-coinvestment",
    section: "Wealth",
    category: "wealth",
    icon: Globe2,
    title: "Family Offices Go Direct: Inside the Co-Investment Renaissance",
    subtitle: "Multi-generational wealth holders are cutting out the middleman — and learning fast",
    readTime: "9 min read",
    date: "June 2026",
    author: "Wealth Intelligence Desk",
    tags: ["Family Office", "Co-Investment", "Private Equity"],
    intro: "The largest family offices in the world are no longer content to be passive LPs. They are building direct investment capabilities, assembling operating committees, and competing — credibly — for allocations alongside the best institutional names.",
    body: [
      {
        heading: "The Co-Investment Pivot",
        content: "A decade ago, co-investment was a privilege extended to anchor LPs as a relationship reward. Today it is a core strategy. Family offices with assets above $500M are now running structured co-investment programs, deploying dedicated capital alongside GP partners and, in some cases, sourcing independently of their fund relationships."
      },
      {
        heading: "Building Internal Capability",
        content: "The build-versus-buy decision for direct investing capability is resolved differently across family types. First-generation wealth holders with operating backgrounds often lead diligence themselves. Multi-generational offices typically hire institutional talent from PE firms, investment banks, or boutique advisors. The common thread is a shift toward owning the analysis rather than delegating it."
      },
      {
        heading: "What GPs Think About It",
        content: "General partners are divided. The best GPs welcome sophisticated co-investors who move quickly, add strategic value, and do not require the hand-holding of a passive institutional LP. Others see family office co-investors as fee compression wrapped in operational complexity. The market is bifurcating: GPs with strong deal flow and brand can afford to be selective; emerging managers often depend on family office capital to close."
      }
    ]
  },
  "mca-market-2026": {
    slug: "mca-market-2026",
    section: "Funding Intelligence",
    category: "markets",
    icon: DollarSign,
    title: "MCA Market in 2026: Speed Is No Longer the Only Edge",
    subtitle: "How the merchant cash advance industry is evolving beyond 24-hour approvals",
    readTime: "7 min read",
    date: "June 2026",
    author: "GLINFICO Research",
    tags: ["MCA", "Alternative Lending", "Fintech"],
    intro: "The merchant cash advance market has matured. The players who built their edge on speed alone are finding that speed is now table stakes — and the real competition is happening on underwriting quality, portfolio intelligence, and borrower retention.",
    body: [
      {
        heading: "From Speed to Sophistication",
        content: "The original MCA value proposition was pure velocity: capital in 24-48 hours when a bank would take 90 days. That remains important, but it is no longer differentiating. Every serious MCA provider can move in two days. The new battleground is risk-adjusted return — and that requires data infrastructure that most funders built late or not at all."
      },
      {
        heading: "The Underwriting Revolution",
        content: "Machine learning models trained on bank statement data, card processing flows, and industry-specific seasonality patterns are now the norm among top-quartile MCA funders. The result is a pricing model that reflects actual default probability rather than the historical rule-of-thumb factors that governed earlier underwriting. Borrowers benefit from more accurate pricing; funders benefit from portfolio performance."
      },
      {
        heading: "What This Means for Brokers",
        content: "For brokers operating in the GLINFICO network, the implication is clear: submission quality matters more than submission speed. A complete application with three months of bank statements, accurate monthly revenue figures, and a clear use-of-funds narrative will consistently outperform incomplete submissions, even when the underlying business is stronger in the latter case."
      }
    ]
  },
  "real-estate-bridge-lending": {
    slug: "real-estate-bridge-lending",
    section: "Real Estate Capital",
    category: "markets",
    icon: TrendingUp,
    title: "Bridge Lending in a Rate Plateau: Opportunities for Patient Capital",
    subtitle: "Why the current rate environment is creating asymmetric entry points in commercial bridge finance",
    readTime: "10 min read",
    date: "June 2026",
    author: "Real Estate Capital Desk",
    tags: ["Real Estate", "Bridge Lending", "Commercial Finance"],
    intro: "Rate plateaus historically create dislocations in commercial real estate bridge markets. Capital that was cheap becomes expensive; operators who borrowed at optimistic assumptions face refinancing walls. For prepared lenders, these moments are generational.",
    body: [
      {
        heading: "The Refinancing Wall",
        content: "A significant volume of commercial real estate debt originated between 2020 and 2022 was structured with interest rate assumptions that no longer reflect reality. As these loans mature, sponsors face a choice: inject equity to service higher-rate refinancing, sell at compressed valuations, or seek bridge financing while they reposition or stabilize the asset."
      },
      {
        heading: "Where Bridge Capital Fits",
        content: "Well-structured bridge lending in this environment targets sponsors with clear stabilization paths, manageable loan-to-value ratios after current market adjustment, and demonstrated execution track records. The rate environment has reduced competition from bank lenders, creating spread opportunities for private bridge capital that were unavailable during the low-rate compression years."
      },
      {
        heading: "DSCR and the New Underwriting Standard",
        content: "Debt service coverage ratio analysis has regained prominence as the primary underwriting lens. In the GLINFICO real estate capital program, submissions with documented DSCR calculations at current market rents — not pro forma projections — are processed with priority routing. The market has little patience for optimistic modeling in 2026."
      }
    ]
  }
};

const categoryColors = {
  markets: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  venture: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  wealth: "bg-green-500/20 text-green-300 border border-green-500/30",
};

const categoryIcon = { finance: DollarSign, economy: BarChart3, insurance: ShieldCheck, travel: Plane, consulting: Briefcase, markets: BarChart3, venture: Briefcase, wealth: Globe2, funding: DollarSign, "real-estate": TrendingUp };

export default function MagazineArticle() {
  const { slug } = useParams();
  const [dbArticle, setDbArticle] = React.useState(null);
  const [dbLoading, setDbLoading] = React.useState(true);

  React.useEffect(() => {
    // Try to load from DB first (AI-generated articles use ID as slug)
    base44.entities.Article.filter({ slug, is_published: true }, "-published_date", 1)
      .then(data => { if (data && data.length > 0) setDbArticle(data[0]); setDbLoading(false); })
      .catch(() => setDbLoading(false));
  }, [slug]);

  const article = dbArticle ? {
    slug: dbArticle.slug,
    section: dbArticle.section,
    category: dbArticle.category,
    icon: categoryIcon[dbArticle.category] || BarChart3,
    title: dbArticle.title,
    subtitle: dbArticle.subtitle,
    readTime: dbArticle.read_time,
    date: dbArticle.published_date,
    author: dbArticle.author,
    tags: dbArticle.tags || [],
    intro: dbArticle.intro,
    body: (() => { try { return JSON.parse(dbArticle.body_json || "[]"); } catch { return []; } })(),
  } : articles[slug];

  const otherArticles = Object.values(articles).filter(a => a.slug !== slug).slice(0, 3);

  if (dbLoading) {
    return (
      <main className="min-h-screen bg-[#070D18] text-white">
        <MagazineHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-[#070D18] text-white">
        <MagazineHeader />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Article not found</h1>
            <Link to="/magazine" className="mt-6 inline-block text-primary hover:underline">Back to Magazine</Link>
          </div>
        </div>
        <MagazineFooter />
      </main>
    );
  }

  const Icon = article.icon || categoryIcon[article.category] || BarChart3;

  return (
    <main className="min-h-screen bg-[#070D18] text-white">
      <MagazineHeader />

      {/* FOD sticky banner */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-primary/95 backdrop-blur border-t border-white/10 py-2.5 px-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-primary-foreground hidden sm:block">
            Need capital? GLINFICO Financial Operations Division — fast access to MCA, real estate, and M&amp;A funding.
          </p>
          <p className="text-sm font-semibold text-primary-foreground sm:hidden">GLINFICO FOD — Fast capital access.</p>
          <a href="https://fod.glinfico.com" target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 rounded-full bg-primary-foreground px-4 py-1.5 text-xs font-bold text-primary hover:opacity-90 transition-opacity">
            fod.glinfico.com <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <article className="px-5 pt-32 pb-28 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Back + Logo */}
          <div className="mb-8 flex items-center justify-between">
            <Link to="/magazine" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Magazine
            </Link>
            <MagazineLogo size="sm" />
          </div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[article.category] || "bg-muted text-muted-foreground"}`}>
                {article.section}
              </span>
              {article.tags.map(tag => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>

            <h1 className="font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">{article.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{article.subtitle}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-t border-border pt-6">
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {article.readTime}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.date}</span>
              <span>By {article.author}</span>
              <button className="ml-auto flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          {article.image_url && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="my-8 overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl shadow-black/40">
              <img src={article.image_url} alt={article.title} className="w-full h-72 sm:h-[480px] object-cover" />
            </motion.div>
          )}

          {/* Intro callout */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="my-10 rounded-2xl border-l-4 border-blue-500 bg-slate-900/60 border border-slate-700/60 p-8">
            <Icon className="mb-4 h-8 w-8 text-blue-400" />
            <p className="text-xl leading-9 font-medium text-white">{article.intro}</p>
          </motion.div>

          {/* Body */}
          <div className="space-y-12">
            {article.body.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                {section.heading && (
                  <h2 className="mb-4 font-display text-2xl tracking-[-0.03em] text-white sm:text-3xl">{section.heading}</h2>
                )}
                {section.content && (
                  <p className="leading-8 text-slate-400 text-lg">{section.content}</p>
                )}
                {/* Inline image per section */}
                {section.image_url && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700/60 shadow-lg shadow-black/30">
                    <img src={section.image_url} alt={section.heading || "Article image"} className="w-full h-64 sm:h-80 object-cover" />
                    {section.image_caption && (
                      <p className="px-5 py-3 text-xs text-slate-500 bg-slate-900/80 italic">{section.image_caption}</p>
                    )}
                  </div>
                )}
                {/* Inline video per section */}
                {section.video_url && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700/60 aspect-video shadow-lg shadow-black/30">
                    <iframe
                      src={section.video_url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={section.heading || "Video"}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Article-level video embed (after body) */}
          {article.video_url && (
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-12">
              <h3 className="mb-4 text-sm uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Play className="h-4 w-4 text-blue-400" /> Video
              </h3>
              <div className="overflow-hidden rounded-2xl border border-slate-700/60 aspect-video shadow-xl shadow-black/40">
                <iframe
                  src={article.video_url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={article.title}
                />
              </div>
            </motion.div>
          )}

        </div>
      </article>

      {/* Related articles */}
      <section className="px-5 py-16 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-sm uppercase tracking-[0.28em] text-muted-foreground">More from FinVenturePro</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherArticles.map((a) => {
              const AIcon = a.icon;
              return (
                <Link key={a.slug} to={`/magazine/article/${a.slug}`}
                  className="group rounded-[1.5rem] border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="mb-4 rounded-xl bg-secondary p-2.5 w-fit"><AIcon className="h-4 w-4 text-primary" /></div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{a.section}</p>
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">{a.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground">{a.readTime}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SubscribePanel />
      <MagazineFooter />
    </main>
  );
}