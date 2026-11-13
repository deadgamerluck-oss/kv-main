import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Award, Briefcase, Check, Clock, Layers, MonitorPlay, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, ConversionBand } from "@/components/site/site-layout";
import { contact } from "@/data/site-content";
import { MessageCircle, Phone } from "lucide-react";
import { benefits, courses, coursesInTier, feeLabel, findCourse, journey, tiers, type Course, type TierId } from "@/data/courses";
import { courseEnquiryName } from "@/lib/course-navigation";

const wrap = "mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12";

export function FeeCta({ course, compact = false }: { course: Course; compact?: boolean }) {
  const msg = encodeURIComponent(`Hi, please share fees and duration for the ${course.tier.replace(/-/g, " ")} ${course.title}.`);
  return <div className={compact ? "flex gap-2" : "grid gap-2"}>
    <Button asChild className={`${compact ? "h-9 flex-1 text-xs" : "h-11 w-full"} bg-accent font-bold text-accent-foreground hover:bg-accent/90`}><a href={`${contact.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />WhatsApp for fees</a></Button>
    <Button asChild variant="outline" className={compact ? "h-9 flex-1 text-xs" : "h-11 w-full"}><a href={contact.phoneHref}><Phone className="size-4" />Call {compact ? "now" : contact.phone}</a></Button>
  </div>;
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-shadow hover:shadow-card">
      <Link to="/courses/$slug" params={{ slug: course.slug }} className="relative block overflow-hidden" aria-label={`View ${course.tier} ${course.title}`}>
        <img src={course.image} alt={`${course.tier} ${course.title}`} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-sm bg-depth px-2.5 py-1 font-display text-sm font-bold text-accent">{course.tier.replace(/-/g, " ")}</span>
        {course.badge && <span className="absolute right-3 top-3 rounded-sm bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">{course.badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold">{course.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{course.tagline}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-xs">
          <span className="flex items-center gap-1.5"><Layers className="size-3.5 shrink-0 text-primary" />{course.modules.length} modules</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3.5 shrink-0 text-primary" />{course.duration ?? "Ask us"}</span>
          <span className="flex items-center gap-1.5"><Wallet className="size-3.5 shrink-0 text-primary" />{course.hybridFee ? `from ${course.hybridFee}` : "On request"}</span>
        </div>
        {!course.hybridFee && <div className="mt-4"><FeeCta course={course} compact /></div>}
        <Button asChild variant="link" className="mt-auto h-auto justify-start p-0 pt-4"><Link to="/courses/$slug" params={{ slug: course.slug }}>View syllabus & fees<ArrowRight className="size-4" /></Link></Button>
      </div>
    </article>
  );
}

function WideCourse({ course }: { course: Course }) {
  return <article className="grid overflow-hidden rounded-md border border-border bg-card shadow-card lg:grid-cols-[1.1fr_0.9fr]">
    <Link to="/courses/$slug" params={{ slug: course.slug }} className="block bg-depth"><img src={course.image} alt={`${course.tier} ${course.title}`} width={1536} height={1024} loading="lazy" className="aspect-[3/2] h-full w-full object-cover" /></Link>
    <div className="flex flex-col p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{course.badge ?? "Featured"} · {course.modules.length} modules</p>
      <h3 className="mt-3 font-display text-3xl font-semibold">{course.title}</h3>
      <p className="mt-3 leading-7 text-muted-foreground">{course.tagline}</p>
      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">{course.modules.slice(0, 8).map((m) => <li key={m.title} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{m.title}</li>)}</ul>
      <p className="mt-2 text-sm font-semibold text-primary">+ {course.modules.length - 8} more modules</p>
      <div className="mt-6">{course.hybridFee ? null : <FeeCta course={course} compact />}</div>
      <Button asChild className="mt-4 h-11 font-bold"><Link to="/courses/$slug" params={{ slug: course.slug }}>View full syllabus<ArrowRight className="size-4" /></Link></Button>
    </div>
  </article>;
}

export function TierTabs({ initial = "18-in-1" as TierId, compact = false }: { initial?: TierId; compact?: boolean }) {
  const [active, setActive] = useState<TierId>(initial);
  const tier = tiers.find((t) => t.id === active);
  const selected = coursesInTier(active);
  const first = selected[0];
  if (!tier) return null;
  return (
    <div>
      <div role="tablist" aria-label="Course levels" className="grid grid-cols-3 gap-2 rounded-md border border-border bg-secondary p-1.5">
        {tiers.map((t) => (
          <Button variant="ghost" key={t.id} role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)} className={`h-auto flex-col items-start whitespace-normal rounded-sm px-2 py-3 text-left transition-colors md:px-4 ${active === t.id ? "bg-depth text-primary-foreground shadow-card hover:bg-depth hover:text-primary-foreground" : "hover:bg-background hover:text-foreground"}`}>
            <span className={`block font-display text-xl font-bold md:text-2xl ${active === t.id ? "text-accent" : "text-primary"}`}>{t.name}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-wide opacity-80 md:text-xs">{t.label}</span>
          </Button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-base leading-7"><strong>{tier.summary}</strong> <span className="text-muted-foreground">Best for: {tier.bestFor}</span></p>
      </div>
      <div className={`mt-6 grid gap-5 md:grid-cols-2 ${compact ? "lg:grid-cols-3" : "lg:grid-cols-3"}`}>
        {selected.length === 1 && first ? <div className="md:col-span-2 lg:col-span-3"><WideCourse course={first} /></div> : coursesInTier(active).map((c) => <CourseCard key={c.slug} course={c} />)}
      </div>
    </div>
  );
}

export function NewLaunchSpotlight() {
  const c = findCourse("11-in-1-digital-marketing");
  if (!c) return null;
  return (
    <section className="bg-depth py-14 text-primary-foreground md:py-20">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]`}>
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground">New launch · Admissions open</span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] md:text-6xl"><span className="text-accent">11 in 1</span> Digital Marketing Course with AI</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/85">{c.tagline}</p>
          <ul className="mt-6 grid max-w-xl gap-2 text-sm sm:grid-cols-2">{c.modules.slice(0, 8).map(m => <li key={m.title} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{m.title}</li>)}</ul>
          <p className="mt-3 text-sm text-primary-foreground/70">+ {c.modules.length - 8} more modules</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-accent font-bold text-accent-foreground hover:bg-accent/90"><Link to="/courses/$slug" params={{ slug: c.slug }}>View full course<ArrowRight className="size-4" /></Link></Button>
            <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact" search={{ program: courseEnquiryName(c), region: "" }}>Book free counselling</Link></Button>
          </div>
        </div>
        <Link to="/courses/$slug" params={{ slug: c.slug }} className="block overflow-hidden rounded-md"><img src={c.image} alt="Digital marketing course with AI" width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105" /></Link>
      </div>
    </section>
  );
}

export function FeaturedCourses() {
  return (
    <section className="py-16 md:py-20">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="section-eyebrow">Our main courses</p><h2 className="section-title">Choose your level:<br />18 in 1 · 11 in 1 · 12 in 1 · 6 in 1</h2></div>
          <Button asChild variant="outline"><Link to="/courses">Compare all courses<ArrowRight className="size-4" /></Link></Button>
        </div>
        <div className="mt-9"><TierTabs compact /></div>
      </div>
    </section>
  );
}

export function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-depth text-primary-foreground"><tr>{["Course", "Modules", "Duration", "Regular fee", "Hybrid fee", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.slug} className="border-t border-border odd:bg-card even:bg-secondary/50">
              <td className="px-4 py-3"><span className="font-display font-bold text-primary">{c.tier.replace(/-/g, " ")}</span> <span className="font-semibold">{c.title}</span></td>
              <td className="px-4 py-3">{c.modules.length}</td>
              <td className="px-4 py-3">{c.duration ?? "Ask at counselling"}</td>
              <td className="px-4 py-3">{feeLabel(c.regularFee)}</td>
              <td className="px-4 py-3 font-semibold">{c.hybridFee ?? <a href={`${contact.whatsapp}?text=${encodeURIComponent(`Hi, please share fees for the ${c.tier.replace(/-/g, " ")} ${c.title}.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary"><MessageCircle className="size-3.5" />Connect for fees</a>}</td>
              <td className="px-4 py-3"><Link to="/courses/$slug" params={{ slug: c.slug }} className="font-bold text-primary">Details →</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CoursesHub() {
  return (
    <>
      <section className="bg-depth pb-14 pt-10 text-primary-foreground md:pb-20 md:pt-14">
        <div className={wrap}>
          <div className="[&_a]:text-primary-foreground/70 [&_span]:text-primary-foreground/90"><Breadcrumbs items={[{ label: "Courses" }]} /></div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-accent">Kshitij Vivan · Since 2011 · 6000+ students placed</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] md:text-6xl">One course. Many skills. <span className="text-accent">Real jobs.</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/85">Pick a level that matches your goal. Every course includes live projects, a portfolio, grooming and placement support.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tiers.map((t) => (
              <a key={t.id} href={`#tier-${t.id}`} className="group rounded-md border border-primary-foreground/20 bg-primary-foreground/5 p-5 transition-colors hover:border-accent">
                <span className="font-display text-4xl font-bold text-accent">{t.name}</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wide">{t.label}</span>
                <span className="mt-3 block text-sm leading-6 text-primary-foreground/80">{t.summary}</span>
                <span className="mt-4 flex items-center gap-1 text-sm font-bold text-accent">{coursesInTier(t.id).length} course{coursesInTier(t.id).length > 1 ? "s" : ""} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
      {tiers.map((t, i) => (
        <section key={t.id} id={`tier-${t.id}`} className={`scroll-mt-24 py-14 md:py-20 ${i % 2 ? "border-y border-border bg-secondary" : ""}`}>
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="section-eyebrow">{t.label}</p><h2 className="section-title">{t.name} courses</h2></div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">Best for: {t.bestFor}</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{coursesInTier(t.id).map(c => coursesInTier(t.id).length === 1 ? <div key={c.slug} className="md:col-span-2 lg:col-span-3"><WideCourse course={c} /></div> : <CourseCard key={c.slug} course={c} />)}</div>
          </div>
        </section>
      ))}
      <section className="py-14 md:py-20"><div className={wrap}><p className="section-eyebrow">Side by side</p><h2 className="section-title">Compare courses & fees</h2><div className="mt-8"><CompareTable /></div><p className="mt-3 text-xs text-muted-foreground">Hybrid = learning with live online classes. Fees marked "Ask at counselling" are shared during your free counselling session.</p></div></section>
      <Journey />
      <ConversionBand />
    </>
  );
}

function Journey() {
  return (
    <section className="border-y border-border bg-secondary py-14 md:py-20">
      <div className={wrap}>
        <p className="section-eyebrow">Your path</p><h2 className="section-title">From first class to first salary</h2>
        <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">{journey.map((s, i) => <li key={s} className="rounded-md border border-border bg-card p-4"><span className="font-display text-sm font-bold text-primary">STEP 0{i + 1}</span><p className="mt-2 font-semibold">{s}</p></li>)}</ol>
      </div>
    </section>
  );
}

export function CourseDetail({ course }: { course: Course }) {
  const tier = tiers.find((t) => t.id === course.tier);
  if (!tier) return null;
  const others = courses.filter((c) => c.slug !== course.slug && c.tier === course.tier).concat(courses.filter((c) => c.tier !== course.tier)).slice(0, 3);
  return (
    <>
      <section className="bg-depth pb-14 pt-10 text-primary-foreground md:pb-20 md:pt-14">
        <div className={wrap}>
          <div className="[&_a]:text-primary-foreground/70 [&_span]:text-primary-foreground/90"><Breadcrumbs items={[{ label: "Courses", to: "/courses" }, { label: `${tier.name} ${course.title}` }]} /></div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{tier.label}{course.badge ? ` · ${course.badge}` : ""}</p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] md:text-6xl"><span className="text-accent">{tier.name}</span> {course.title}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/85">{course.tagline}</p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[[Layers, `${course.modules.length}`, "Modules"], [Clock, course.duration ?? "Ask us", "Duration"], [MonitorPlay, "Hybrid", "Classroom + live"], [Briefcase, "700+", "Hiring partners"]].map(([Icon, v, l]) => {
                  const I = Icon as typeof Layers;
                  return <div key={l as string} className="rounded-md border border-primary-foreground/20 p-3"><I className="size-4 text-accent" /><p className="mt-2 font-display text-lg font-bold">{v as string}</p><p className="text-xs text-primary-foreground/70">{l as string}</p></div>;
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild className="h-12 bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"><Link to="/contact" search={{ program: courseEnquiryName(course), region: "" }}>Book free counselling<ArrowRight /></Link></Button><Button asChild variant="outline" className="h-12 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="#syllabus">See syllabus</a></Button></div>
            </div>
            <img src={course.image} alt={`${tier.name} ${course.title} overview`} width={1536} height={1024} className="aspect-[3/2] w-full rounded-md object-cover" />
          </div>
        </div>
      </section>

      <section id="syllabus" className="scroll-mt-24 py-14 md:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1.4fr_0.6fr]`}>
          <div>
            <p className="section-eyebrow">Module by module</p><h2 className="section-title">What you will learn</h2>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {course.modules.map((m, i) => (
                <li key={m.title} className="flex gap-4 rounded-md border border-border bg-card p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0"><h3 className="font-semibold">{m.title}</h3>{m.detail && <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>}</div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="h-fit rounded-md border border-border bg-secondary p-6 lg:sticky lg:top-28">
            <p className="section-eyebrow">Course details</p>
            <dl className="mt-4 divide-y divide-border text-sm">
              {[["Duration", course.duration ?? "Ask at counselling"], ["Regular fees", feeLabel(course.regularFee)], ["Hybrid fees", feeLabel(course.hybridFee)], ["Learning mode", course.mode], ...(course.salary ? [["Salary potential", course.salary]] : [])].map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>)}
            </dl>
            {!course.hybridFee && <div className="mt-5 rounded-md border border-accent bg-background p-4"><p className="text-sm font-semibold">Get fees, duration & batch timings</p><p className="mt-1 text-xs text-muted-foreground">Connect with our counsellor for complete details.</p><div className="mt-3"><FeeCta course={course} /></div></div>}
            <Button asChild className="mt-5 h-12 w-full font-bold"><Link to="/contact" search={{ program: courseEnquiryName(course), region: "" }}>Enquire about this course<ArrowRight /></Link></Button>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-14 md:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-3`}>
          <div><p className="section-eyebrow">Software & AI</p><h2 className="mt-3 font-display text-3xl font-semibold">Tools you will master</h2><div className="mt-6 flex flex-wrap gap-2">{course.tools.map((t) => <span key={t} className="rounded-sm border border-border bg-card px-3 py-1.5 text-sm font-semibold">{t}</span>)}</div></div>
          <div><p className="section-eyebrow">Careers</p><h2 className="mt-3 font-display text-3xl font-semibold">Jobs you can apply for</h2><ul className="mt-6 grid gap-2">{course.roles.map((r) => <li key={r} className="flex items-center gap-2 text-sm"><Briefcase className="size-4 text-primary" />{r}</li>)}</ul><p className="mt-4 text-sm text-muted-foreground">Freelance on Fiverr, Upwork and Guru alongside your job.</p></div>
          <div><p className="section-eyebrow">Included</p><h2 className="mt-3 font-display text-3xl font-semibold">Learning beyond class</h2><ul className="mt-6 grid gap-2">{benefits.map((b) => <li key={b} className="flex items-center gap-2 text-sm"><Check className="size-4 text-primary" />{b}</li>)}</ul></div>
        </div>
      </section>

      <section className="py-14 md:py-20"><div className={wrap}><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-eyebrow"><Award className="mr-1 inline size-4" />Compare</p><h2 className="section-title">Other courses</h2></div><Button asChild variant="outline"><Link to="/courses">All courses<ArrowRight className="size-4" /></Link></Button></div><div className="mt-8 grid gap-5 md:grid-cols-3">{others.map((c) => <CourseCard key={c.slug} course={c} />)}</div></div></section>
      <ConversionBand program={`${tier.name} ${course.title}`} />
    </>
  );
}
