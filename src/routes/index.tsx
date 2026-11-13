import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionBand, FaqList } from "@/components/site/site-layout";
import { ProgramCard } from "@/components/site/content-pages";
import { useSiteContent } from "@/components/site/content-provider";
import { BatchModes, ReachMap, ToolsShowcase } from "@/components/site/edtech";
import { FeaturedCourses, NewLaunchSpotlight } from "@/components/site/courses";
import { headquarters, headquartersMeta } from "@/lib/site-seo";
import { HeroSlider } from "@/components/site/hero-slider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...headquartersMeta,
      { title: "Design & AI Courses Online Worldwide and in Ahmedabad — Kshitij Vivan" },
      { name: "description", content: "Compare 18 in 1, 12 in 1 and 6 in 1 design, video and AI courses, plus our new Digital Marketing with AI course. Live online classes worldwide and classroom learning at our Ahmedabad headquarters." },
      { property: "og:title", content: "Creative courses in Ahmedabad — Kshitij Vivan" },
      { property: "og:description", content: "Build practical creative skills, develop portfolio work, and compare learning paths with mentor guidance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...headquarters }) }],
  }),
  component: HomePage,
});

function HomePage() {
  const { commonFaqs, programs, projects, articles } = useSiteContent();
  return <>
    <HeroSlider />
    <section className="border-y border-border bg-card"><div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">{[['Since 2011', 'Trusted by parents & students'], ['6000+', 'Students placed in industry'], ['700+', 'Hiring & internship partners'], ['2x Drona Award', 'Government of Gujarat']].map(([title, copy]) => <div key={title} className="border-r border-border px-5 py-6 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:px-8"><p className="font-display text-xl font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{copy}</p></div>)}</div></section>
    <NewLaunchSpotlight />
    <FeaturedCourses />
    <section className="border-t border-border py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-eyebrow">Specialisations</p><h2 className="section-title">Big ideas start with<br />the right skills.</h2></div><div className="max-w-sm"><p className="text-base leading-7 text-muted-foreground">Explore design, animation and creative technology. See what you’ll learn before you choose.</p><Button asChild variant="link" className="mt-3 h-auto p-0"><Link to="/programs">Explore specialisations<ArrowRight className="size-4" /></Link></Button></div></div><div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{programs.map(program => <ProgramCard key={program.slug} program={program} />)}</div></div></section>
    <section className="py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-eyebrow">03 / Create something that matters</p><h2 className="section-title">Less passive learning.<br />More making.</h2></div><Button asChild variant="outline"><Link to="/work">Explore creative work<ArrowRight className="size-4" /></Link></Button></div><div className="mt-9 grid gap-6 md:grid-cols-3">{projects.map((project, index) => <article key={project.title} className="group"><div className="overflow-hidden rounded-md"><img src={project.image} alt={`${project.title} portfolio direction`} width={700} height={800} loading="lazy" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /></div><p className="mt-4 text-xs font-semibold text-primary">0{index+1} / {project.meta}</p><h3 className="mt-2 font-display text-2xl font-semibold">{project.title}</h3></article>)}</div><p className="mt-5 text-xs text-muted-foreground">Creative project directions across our programmes.</p></div></section>
    <BatchModes />
    <ToolsShowcase />
    <ReachMap />
    <section className="py-16 md:py-20"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><p className="section-eyebrow">07 / A better way to begin</p><h2 className="section-title">Your next chapter,<br />one step at a time.</h2><p className="mt-5 max-w-sm leading-7 text-muted-foreground">Whether you’re a student, a graduate or changing careers, start with a conversation about your interests.</p><Button asChild className="mt-6"><Link to="/contact">Find my course<ArrowRight className="size-4" /></Link></Button></div><ol className="divide-y divide-border border-y border-border">{[['Explore your interests', 'Compare creative fields and the work you want to make.'], ['Understand your course', 'Review modules, tools and portfolio direction. Ask about fees and timings.'], ['Choose how you learn', 'Join the Ahmedabad classroom or a live online batch.'], ['Build and refine', 'Develop practical work, receive feedback and present your projects.']].map(([title,copy], i) => <li key={title} className="flex gap-5 py-6"><span className="font-display text-2xl text-primary">0{i+1}</span><div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div></li>)}</ol></div></section>
    <section className="border-y border-border bg-secondary py-16 md:py-20"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><p className="section-eyebrow">Questions, answered</p><h2 className="section-title">A clear decision<br />starts here.</h2><Button asChild variant="link" className="mt-5 p-0"><Link to="/faq">All questions<ArrowRight className="size-4" /></Link></Button></div><FaqList items={commonFaqs.slice(0,4)} /></div></section>
    {!!articles.length && <section className="py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-eyebrow">The creative journal</p><h2 className="section-title">Perspective for your path.</h2></div><Button asChild variant="link"><Link to="/blog">All insights<ArrowRight className="size-4" /></Link></Button></div><div className="mt-9 grid gap-8 md:grid-cols-3">{articles.filter(a=>a.status==='published').slice(0,3).map(a=><article key={a.slug} className="border-t-2 border-primary pt-5"><p className="text-xs font-semibold text-muted-foreground">{a.category}</p><h3 className="mt-4 font-display text-2xl font-semibold">{a.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{a.excerpt}</p><Button asChild variant="link" className="mt-4 p-0"><Link to="/blog/$slug" params={{slug:a.slug}}>Read article<ArrowRight className="size-4" /></Link></Button></article>)}</div></div></section>}
    <ConversionBand />
  </>;
}
