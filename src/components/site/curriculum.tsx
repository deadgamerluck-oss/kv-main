import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, Download, Hammer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Program } from "@/data/site-content";
import { useSiteContent } from "./content-provider";
import { ToolChip } from "@/components/site/edtech";

export const stages = [
  { key: "foundation", label: "Foundation", modules: [0, 1] },
  { key: "core", label: "Core Skills", modules: [2, 3] },
  { key: "specialisation", label: "Specialisation", modules: [4] },
  { key: "portfolio", label: "Portfolio & Career", modules: [5] },
] as const;

export function stageOf(index: number) {
  return stages.find((s) => (s.modules as readonly number[]).includes(index))?.label ?? "";
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} data-shown={shown} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function MissingNote() {
  return <p className="border-l-4 border-accent bg-accent/10 px-4 py-3 text-xs leading-5 text-foreground">Duration, fees and intake dates: <strong>ask us</strong>. Module order may be refined once the final syllabus is confirmed.</p>;
}

/* Homepage: tabbed explorer */
export function CurriculumExplorer() {
  const { programs } = useSiteContent();
  const [active, setActive] = useState(programs[0]?.slug ?? "");
  const program = programs.find((p) => p.slug === active) ?? programs[0];
  if (!program) return null;
  return <section className="relative overflow-hidden bg-depth py-16 text-primary-foreground md:py-20">

    <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">02 / Curriculum first</p><h2 className="mt-4 font-display text-4xl font-semibold md:text-6xl">Know what you’ll learn.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-primary-foreground/75">Your course, module by module. Build a clear picture of your learning path.</p></div>
        <Button asChild variant="outline" className="w-fit rounded-none border-primary-foreground/35 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground hover:text-depth"><Link to="/curriculum">Full curriculum & compare <ArrowRight /></Link></Button>
      </div>
      <div role="tablist" aria-label="Courses" className="mt-10 flex gap-2 overflow-x-auto pb-2">
        {programs.map((p) => <Button variant="ghost" key={p.slug} role="tab" aria-selected={p.slug === active} onClick={() => setActive(p.slug)} className={`h-auto shrink-0 rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${p.slug === active ? "border-accent bg-accent text-accent-foreground" : "border-primary-foreground/25 text-primary-foreground/80 hover:border-accent"}`}><span className="mr-2 opacity-70">{p.number}</span>{p.title}</Button>)}
      </div>
      <div key={program.slug} className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ol className="grid gap-3 sm:grid-cols-2">
          {program.curriculum.map((m, i) => <li key={m.title} className="rounded-md border border-primary-foreground/20 bg-primary-foreground/5 p-6"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center bg-accent text-sm font-bold text-accent-foreground">{String(i + 1).padStart(2, "0")}</span><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">{stageOf(i)}</span></div><h3 className="mt-4 font-display text-xl font-semibold">{m.title}</h3><ul className="mt-3 space-y-1.5 text-sm leading-6 text-primary-foreground/85">{m.topics.slice(0, 3).map((t) => <li key={t}>· {t}</li>)}</ul></li>)}
        </ol>
        <div className="flex flex-col gap-6 border-l-4 border-accent bg-background p-7 text-foreground">
          <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary"><Hammer className="size-4" />What you build</p><ul className="mt-3 space-y-2">{program.outcomes.map((o) => <li key={o} className="flex gap-2 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-signal" />{o}</li>)}</ul></div>
          <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary"><Wrench className="size-4" />Tools you learn</p><div className="mt-3 flex flex-wrap gap-2">{program.tools.map((t) => <ToolChip key={t} name={t} />)}</div></div>
          <Button asChild className="mt-auto h-12 rounded-none bg-depth font-bold text-primary-foreground hover:bg-depth/90"><Link to="/programs/$slug" params={{ slug: program.slug }}>See full {program.title} curriculum <ArrowRight /></Link></Button>
        </div>
      </div>
    </div>
  </section>;
}

/* Course page: numbered timeline + sticky summary */
export function ModuleTimeline({ program }: { program: Program }) {
  return <section className="py-16 md:py-24"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-[1.5fr_0.9fr] lg:px-12">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Module by module</p>
      <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Your learning journey</h2>
      <ol className="relative mt-10 border-l-2 border-transparent [border-image:var(--gradient-brand)_1]">
        {program.curriculum.map((m, i) => <li key={m.title} className="relative pb-10 pl-10 last:pb-0"><span className="absolute -left-[21px] top-0 grid size-10 place-items-center bg-depth font-display text-sm font-bold text-accent shadow-card">{String(i + 1).padStart(2, "0")}</span><Reveal delay={i * 60}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-signal">{stageOf(i)}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">{m.title}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">{m.topics.map((t) => <li key={t} className="flex gap-2 text-sm leading-6 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{t}</li>)}</ul>
        </Reveal></li>)}
      </ol>
    </div>
    <aside className="lg:sticky lg:top-28 lg:self-start"><div className="overflow-hidden bg-card shadow-card"><div className="brand-strip" /><div className="space-y-6 p-7">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Curriculum at a glance</p>
      <dl className="grid grid-cols-2 gap-4 text-sm"><div><dt className="text-muted-foreground">Modules</dt><dd className="font-display text-2xl font-semibold">{program.curriculum.length}</dd></div><div><dt className="text-muted-foreground">Stages</dt><dd className="font-display text-2xl font-semibold">{stages.length}</dd></div><div><dt className="text-muted-foreground">Duration</dt><dd className="font-semibold">Ask us</dd></div><div><dt className="text-muted-foreground">Fees</dt><dd className="font-semibold">Ask us</dd></div><div className="col-span-2"><dt className="text-muted-foreground">Batches</dt><dd className="mt-1 flex flex-wrap gap-2"><span className="bg-depth px-2.5 py-1 text-xs font-bold text-primary-foreground">Offline · Ahmedabad</span><span className="bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">Live online</span></dd></div></dl>
      <div><p className="text-xs font-bold uppercase tracking-[0.14em]">Tools</p><div className="mt-2 flex flex-wrap gap-1.5">{program.tools.map((t) => <ToolChip key={t} name={t} />)}</div></div>
      <div><p className="text-xs font-bold uppercase tracking-[0.14em]">Roles to explore</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{program.roles.slice(0, 4).join(" · ")}</p></div>
      <Button asChild className="h-12 w-full rounded-none bg-accent font-bold text-accent-foreground hover:bg-accent/90"><Link to="/contact" search={{ program: program.title, region: "" }}>Enquire about this field <ArrowRight /></Link></Button>
      <MissingNote />
    </div></div></aside>
  </div></section>;
}

/* Curriculum page */
export function CurriculumPage() {
  const { programs } = useSiteContent();
  return <>
    <section className="bg-gradient-depth pb-20 pt-16 text-primary-foreground edge-v-bottom md:pt-24"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Curriculum</p>
      <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">From first sketch to <span className="text-gradient-light">career-ready</span> portfolio.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/75">Explore each specialisation through foundations, core skills, project practice and portfolio development.</p>
      <Button asChild className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/courses">Compare main courses & fees<ArrowRight /></Link></Button>
      <div className="mt-10 grid grid-cols-2 gap-px bg-primary-foreground/15 md:grid-cols-4">{stages.map((s, i) => <div key={s.key} className="bg-depth/70 p-5"><span className="font-display text-3xl font-semibold text-accent">{i + 1}</span><p className="mt-2 font-semibold">{s.label}</p></div>)}</div>
    </div></section>

    <section className="py-16 md:py-24"><div className="mx-auto max-w-[1440px] space-y-10 px-5 md:px-8 lg:px-12">
      {programs.map((p) => <Reveal key={p.slug}><article className="overflow-hidden border border-border bg-card shadow-card">
        <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-4"><span className="grid size-12 place-items-center bg-gradient-brand font-display font-bold text-depth">{p.number}</span><div><h2 className="font-display text-2xl font-semibold">{p.title}</h2><p className="text-sm text-muted-foreground">{p.direction}</p></div></div>
          <div className="flex gap-2"><Button variant="outline" className="rounded-none font-bold" onClick={() => downloadModules(p)}><Download /> Module list</Button><Button asChild className="rounded-none bg-depth font-bold text-primary-foreground hover:bg-depth/90"><Link to="/programs/$slug" params={{ slug: p.slug }}>Explore field <ArrowRight /></Link></Button></div></div>
        <div className="grid md:grid-cols-4">{stages.map((s) => <div key={s.key} className="border-b border-border p-5 md:border-b-0 md:border-r md:last:border-r-0"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-signal">{s.label}</p>{s.modules.map((mi) => { const m = p.curriculum[mi]; return m ? <div key={m.title} className="mt-3"><p className="font-semibold">{String(mi + 1).padStart(2, "0")} · {m.title}</p><ul className="mt-1 space-y-1 text-xs leading-5 text-muted-foreground">{m.topics.map((t) => <li key={t}>{t}</li>)}</ul></div> : null; })}</div>)}</div>
      </article></Reveal>)}
    </div></section>

    <CompareTable />
  </>;
}

export function CompareTable() {
  const { programs } = useSiteContent();
  return <section className="border-t border-border bg-secondary py-16 md:py-24"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Compare specialisations</p>
    <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Side by side.</h2>
    <div className="mt-10 overflow-x-auto bg-card shadow-card"><table className="w-full min-w-[900px] text-left text-sm">
      <thead className="bg-depth text-primary-foreground"><tr>{["Specialisation", "Level", "Modules", "Key tools", "Outcomes", "Duration / fees"].map((h) => <th key={h} className="p-4 text-xs font-bold uppercase tracking-[0.12em]">{h}</th>)}</tr></thead>
      <tbody>{programs.map((p) => <tr key={p.slug} className="border-b border-border align-top last:border-0">
        <td className="p-4"><Link to="/programs/$slug" params={{ slug: p.slug }} className="font-display font-semibold text-primary hover:underline">{p.title}</Link></td>
        <td className="p-4">Beginner friendly → portfolio</td>
        <td className="p-4">{p.curriculum.length} modules · 4 stages</td>
        <td className="p-4 text-muted-foreground">{p.tools.slice(0, 3).join(", ")}</td>
        <td className="p-4 text-muted-foreground">{p.outcomes.join("; ")}</td>
        <td className="p-4 font-semibold">Ask us</td>
      </tr>)}</tbody>
    </table></div>
  </div></section>;
}

function downloadModules(p: Program) {
  const text = [`Kshitij Vivan — ${p.title}`, "Learning · Technology · Careers", "", ...p.curriculum.flatMap((m, i) => [`${String(i + 1).padStart(2, "0")}. ${m.title} (${stageOf(i)})`, ...m.topics.map((t) => `   - ${t}`), ""]), "Tools: " + p.tools.join(", "), "Duration and fees: ask us — +91 91374 40042"].join("\n");
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a"); a.href = url; a.download = `${p.slug}-modules.txt`; a.click(); URL.revokeObjectURL(url);
}
