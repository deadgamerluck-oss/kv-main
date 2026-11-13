import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowRight, Building2, Laptop, MapPin, Users, CalendarClock, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import designImage from "@/assets/course-design-still-life.jpg";
import { Reveal } from "@/components/site/curriculum";

export function cleanToolName(name: string) {
  return name.replace(/\s*\((awareness|basics|foundations|tracking|research)\)/i, "");
}

export function ToolChip({ name, dark = false }: { name: string; dark?: boolean }) {
  return <span className={`inline-flex border px-3 py-1.5 text-xs font-semibold ${dark ? "border-primary-foreground/20 text-primary-foreground" : "border-border bg-card text-foreground"}`}>{cleanToolName(name)}</span>;
}

/* Reactive tilt card */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`); el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  }
  function leave() { if (ref.current) ref.current.style.transform = ""; }
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt-card ${className}`}>{children}</div>;
}

/* Hero spotlight follows the cursor */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const on = (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.setProperty("--sx", `${e.clientX - r.left}px`); el.style.setProperty("--sy", `${e.clientY - r.top}px`); };
    el.addEventListener("pointermove", on);
    return () => el.removeEventListener("pointermove", on);
  }, []);
  return ref;
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1400); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const allTools = ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Autodesk Maya", "Blender", "ZBrush", "Substance Painter", "Adobe After Effects", "Adobe Premiere Pro", "Nuke", "Adobe XD", "DaVinci Resolve", "Unity", "Unreal Engine", "Creative AI tools"];

export function ToolsShowcase() {
  return <section className="relative overflow-hidden bg-background py-16 md:py-24"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">05 / Your creative toolkit</p><h2 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-5xl">Professional tools. Practical skills.</h2></div><p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">Hands-on practice on professional software across design, 3D, VFX, video, UI/UX and games, guided by mentors.</p></div>
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-3 lg:grid-cols-4">
      {allTools.map(t => <p key={t} className="border-b border-border py-4 text-sm font-semibold">{t}</p>)}
    </div>
  </div></section>;
}

export function BatchModes() {
  const modes = [
    { icon: Building2, title: "Offline classroom batches", place: "Ahmedabad learning centre, C.G. Road", points: ["In-person learning at our Ahmedabad centre", "Peer critiques and live project reviews", "Batch timings: ask our team"] },
    { icon: Laptop, title: "Live online batches", place: "Join live from anywhere in the world", points: ["Live interactive classes, not just recordings", "Same curriculum and mentor feedback", "Current batch availability: ask our team"] },
  ];
  return <section className="relative bg-secondary py-16 md:py-24"><div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">04 / Choose your classroom</p>
    <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-foreground md:text-5xl">Your classroom. Your choice.</h2>
    <div className="mt-10 grid gap-6 md:grid-cols-2">{modes.map(({ icon: Icon, title, place, points }, i) => <Reveal key={title} delay={i * 120}><Tilt className="relative h-full overflow-hidden rounded-md border border-border bg-card p-8">
      <div className="spot-glow" aria-hidden />
      <div className="relative"><span className={`grid size-14 place-items-center ${i ? "bg-accent text-accent-foreground" : "bg-depth text-primary-foreground"}`}><Icon className="size-7" /></span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{title}</h3><p className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary"><MapPin className="size-4" />{place}</p>
      <ul className="mt-6 space-y-3">{points.map((p) => <li key={p} className="flex gap-3 text-foreground"><span className="mt-2 size-2 shrink-0 bg-accent" />{p}</li>)}</ul></div>
    </Tilt></Reveal>)}</div>
    <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border border-border bg-card px-4 py-4 text-sm text-foreground"><span className="flex items-center gap-2"><CalendarClock className="size-4 text-primary" />Batch timings and next intake: <strong>ask us</strong></span><Button asChild variant="link" className="ml-auto h-auto p-0 font-bold"><Link to="/contact">Check upcoming batches <ArrowRight /></Link></Button></div>
  </div></section>;
}

export function ReachMap() {
  return <section className="bg-depth py-16 text-primary-foreground md:py-20"><div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:px-12">
    <div><p className="text-xs font-bold uppercase text-accent">Learning without borders</p><h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Ahmedabad headquarters.<br />Worldwide learning.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/85">Build your creative skills with live mentor-led classes, wherever you are. Join us online or learn in person at our Ahmedabad headquarters.</p><Button asChild className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/contact">Discuss learning options<ArrowRight /></Link></Button></div>
    <img src={designImage} alt="Creative packaging and editorial design study" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
  </div></section>;
}
