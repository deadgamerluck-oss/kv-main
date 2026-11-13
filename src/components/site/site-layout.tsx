import { Link, useRouterState } from "@tanstack/react-router";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useSiteContent } from "./content-provider";
import { consultationSchema } from "@/lib/cms-schema";
import { submitConsultation } from "@/lib/consultation.functions";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/kv-logo.png";
import mark from "@/assets/kv-mark.svg";
import { enquiryOptions } from "@/lib/course-navigation";

const nav = [
  { to: "/courses", label: "Courses" },
  { to: "/programs", label: "Specialisations" },
  { to: "/work", label: "Creative work" },
  { to: "/about", label: "Why KV" },
  { to: "/contact", label: "Contact & visit" },
  { to: "/blog", label: "Insights" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const onHome = false;
  const { contact } = useSiteContent();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="hidden border-b border-border bg-secondary md:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-8 text-xs lg:px-12">
          <span className="flex items-center gap-2">
            <MapPin className="size-3" />
            Ahmedabad classroom · Live online worldwide
          </span>
          <a href={contact.phoneHref} className="flex items-center gap-2 font-semibold">
            <Phone className="size-3" />
            {contact.phone}
          </a>
        </div>
      </div>
      <header
        className={`z-50 border-b shadow-sm ${onHome ? "absolute inset-x-0 top-0 border-primary-foreground/25 text-primary-foreground" : "sticky top-0 border-border bg-background/95 text-foreground backdrop-blur"}`}
      >
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 px-5 md:px-8 xl:flex lg:px-12">
          <Link to="/" className="flex min-w-0 items-center" aria-label="Kshitij Vivan home">
            <img
              src={logo}
              alt="Kshitij Vivan — Learning · Technology · Careers"
              className="h-10 w-auto md:h-14"
            />
          </Link>
          <nav
            className="ml-auto hidden items-center gap-5 text-[13px] font-semibold xl:flex"
            aria-label="Main navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{
                  className:
                    "text-primary underline decoration-accent decoration-2 underline-offset-8",
                }}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            className="ml-2 hidden h-11 rounded-md bg-primary px-4 font-bold text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            <Link to="/contact">
              Enquire now <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`shrink-0 xl:hidden ${onHome ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-5 py-3 text-foreground xl:hidden">
            <img src={mark} alt="" className="mx-auto my-3 h-12 w-auto" />
            <nav className="grid" aria-label="Mobile navigation">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-4 font-semibold"
                >
                  {item.label}
                  <ArrowRight className="size-4" />
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-semibold text-primary"
              >
                Book a consultation
                <ArrowRight className="size-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <SiteFooter />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-3 md:hidden">
        <Button
          asChild
          className="h-12 w-full rounded-none bg-accent font-bold text-accent-foreground hover:bg-accent/90"
        >
          <Link to="/contact">
            Book free consultation <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const { contact } = useSiteContent();
  return (
    <footer className="relative bg-depth pb-24 pt-14 text-primary-foreground md:pb-14">
      <div className="brand-strip absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-primary-foreground/15 pb-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={mark} alt="" className="h-12 w-auto" />
              <span>
                <span className="block font-display text-xl font-semibold tracking-wide">
                  KSHITIJ VIVAN
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-accent">
                  Learning · Technology · Careers
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/85">
              Project-led creative technology education in Ahmedabad for learners exploring design,
              animation, VFX, digital products, video, games, and emerging tools.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Explore</p>
              <div className="mt-4 grid gap-3 text-sm text-primary-foreground/85">
                <Link to="/courses">All courses</Link>
                <Link to="/programs">Specialisations</Link>
                <Link to="/work">Student work</Link>
                <Link to="/curriculum">Specialisation syllabus</Link>
                <Link to="/faq">FAQs</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">About</p>
              <div className="mt-4 grid gap-3 text-sm text-primary-foreground/85">
                <Link to="/about">Why KV</Link>
                <Link to="/testimonials">Testimonials</Link>
                <Link to="/blog">Insights</Link>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Contact</p>
              <a
                href={contact.phoneHref}
                className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/85"
              >
                <Phone className="size-4" />
                {contact.phone}
              </a>
              <a
                href={contact.whatsapp}
                className="mt-3 flex items-center gap-2 text-sm text-primary-foreground/85"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
              <p className="mt-3 flex gap-2 text-sm leading-6 text-primary-foreground/85">
                <MapPin className="mt-1 size-4 shrink-0" />
                {contact.address}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-primary-foreground/75 sm:flex-row sm:justify-between">
          <p>© 2026 Kshitij Vivan. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground"
    >
      <Link to="/">Home</Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span>/</span>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { heroes } = useSiteContent();
  const custom = heroes[pathname.split("/")[1] ?? ""];
  title = custom?.title ?? title;
  intro = custom?.intro ?? intro;
  return (
    <section className="border-b border-border bg-secondary pt-12 md:pt-16">
      <div className="mx-auto max-w-[1440px] px-5 pb-12 md:px-8 md:pb-16 lg:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.1] md:text-6xl">
            {title}
          </h1>
          <div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">{intro}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConsultationForm({
  defaultProgram = "",
  defaultRegion = "",
}: {
  defaultProgram?: string | undefined;
  defaultRegion?: string | undefined;
}) {
  const { programs } = useSiteContent();
  const options = enquiryOptions(programs);
  const prefix = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const saveEnquiry = useServerFn(submitConsultation);
  const [submitted, setSubmitted] = useState(false);
  const [program, setProgram] = useState(defaultProgram);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const f = new FormData(event.currentTarget);
    const parsed = consultationSchema.safeParse({
      name: f.get("name"),
      phone: f.get("phone"),
      stage: f.get("stage"),
      program,
      region: defaultRegion,
      website: f.get("website") ?? "",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await saveEnquiry({ data: parsed.data });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  if (submitted)
    return (
      <div className="flex min-h-96 flex-col items-start justify-center bg-background p-7 md:p-9">
        <span className="grid size-14 place-items-center bg-accent text-accent-foreground">
          <Check />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold">
          Your enquiry has been received.
        </h2>
        <p className="mt-3 max-w-sm leading-7 text-muted-foreground">
          Our team will contact you about your programme interests.
        </p>
        <Button className="mt-7 rounded-none" onClick={() => setSubmitted(false)}>
          Send another enquiry
        </Button>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-5 bg-background p-7 text-foreground md:p-9">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Free career consultation
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Tell us what interests you</h2>
      </div>
      <div>
        <Label htmlFor={`${prefix}-name`}>Full name</Label>
        <Input
          id={`${prefix}-name`}
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          className="mt-2 h-12 rounded-none"
        />
      </div>
      <div>
        <Label htmlFor={`${prefix}-phone`}>Phone number</Label>
        <Input
          id={`${prefix}-phone`}
          name="phone"
          minLength={7}
          maxLength={25}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className="mt-2 h-12 rounded-none"
          placeholder="+91"
        />
      </div>
      <div>
        <Label htmlFor={`${prefix}-stage`}>I am currently</Label>
        <select
          id={`${prefix}-stage`}
          name="stage"
          required
          defaultValue=""
          className="mt-2 h-12 w-full border border-input bg-background px-3 text-sm"
        >
          <option value="" disabled>
            Select your stage
          </option>
          <option>In school or college</option>
          <option>Recently graduated</option>
          <option>Working and exploring a change</option>
          <option>Exploring for someone else</option>
        </select>
      </div>
      <div>
        <Label htmlFor={`${prefix}-interest`}>Area of interest</Label>
        <select
          id={`${prefix}-interest`}
          name="interest"
          required
          value={program}
          onChange={(event) => setProgram(event.target.value)}
          className="mt-2 h-12 w-full border border-input bg-background px-3 text-sm"
        >
          <option value="" disabled>
            Select a course or specialisation
          </option>
          {program && ![...options.courses, ...options.specialisations].includes(program) && (
            <option value={program}>{program}</option>
          )}
          <optgroup label="Main courses — 18 in 1 / 11 in 1 / 12 in 1 / 6 in 1">
            {options.courses.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </optgroup>
          <optgroup label="Specialisations">
            {options.specialisations.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </optgroup>
        </select>
      </div>
      {defaultRegion && <input type="hidden" name="region" value={defaultRegion} />}
      <input
        name="website"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={busy}
        className="h-13 w-full rounded-none bg-depth font-bold text-primary-foreground hover:bg-depth/90"
      >
        {busy ? "Sending…" : "Request my consultation"} <ArrowRight />
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        No commitment required. Your details are used only to respond to this enquiry.
      </p>
    </form>
  );
}

export function FaqList({ items }: { items: [string, string][] }) {
  return (
    <div className="border-t border-border">
      {items.map(([question, answer]) => (
        <details key={question} className="group border-b border-border py-5">
          <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-4 font-display text-lg font-semibold">
            <span>{question}</span>
            <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl pt-4 leading-7 text-muted-foreground">{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ConversionBand({ program, region }: { program?: string; region?: string }) {
  const { contact } = useSiteContent();
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[1fr_0.85fr] lg:px-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Your next step
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight md:text-6xl">
            Turn curiosity into a clear direction.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/75">
            Compare learning paths, ask for current fees and schedules, and decide what fits without
            committing on the spot.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-none border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={contact.phoneHref}>
                <Phone />
                {contact.phone}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={contact.whatsapp}>
                <MessageCircle />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <ConsultationForm defaultProgram={program} defaultRegion={region} />
      </div>
    </section>
  );
}
