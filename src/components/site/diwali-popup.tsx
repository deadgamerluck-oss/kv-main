import { useEffect, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Gift, Loader2, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DIWALI_OFFER, diwaliLeadSchema, shouldShowOffer } from "@/lib/diwali-offer";
import { submitDiwaliLead } from "@/lib/diwali-leads.functions";
import { useSiteContent } from "./content-provider";
import festiveImage from "@/assets/diwali-offer.jpg";

export function DiwaliPopup() {
  const { contact, offer } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [bundle, setBundle] = useState<string>(DIWALI_OFFER.bundles[0]);
  const shown = useRef(false);
  const saveLead = useServerFn(submitDiwaliLead);

  useEffect(() => {
    if (!offer.enabled) return;
    try { shown.current = !shouldShowOffer(localStorage.getItem(DIWALI_OFFER.storageKey)); } catch { /* Session-only fallback. */ }
    const showOnce = () => {
      if (shown.current || document.visibilityState !== "visible" || document.querySelector('[role="dialog"]') || document.activeElement?.matches("input, textarea, select")) return;
      shown.current = true;
      try { localStorage.setItem(DIWALI_OFFER.storageKey, "seen"); } catch { /* Avoid blocking visitors with restricted storage. */ }
      setOpen(true);
    };
    const timer = window.setTimeout(showOnce, offer.delaySeconds * 1000);
    const exit = (event: MouseEvent) => { if (event.clientY <= 0 && event.relatedTarget === null) showOnce(); };
    document.addEventListener("mouseout", exit);
    return () => { window.clearTimeout(timer); document.removeEventListener("mouseout", exit); };
  }, [offer.enabled, offer.delaySeconds]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const parsed = diwaliLeadSchema.safeParse({ name: form.get("name"), phone: form.get("phone"), bundle, mode: form.get("mode"), consent: form.get("consent") === "on", website: form.get("website") });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }
    setBusy(true); setError("");
    try { await saveLead({ data: parsed.data }); setSubmitted(true); }
    catch (err) { setError(err instanceof Error ? err.message : "Please try again."); }
    finally { setBusy(false); }
  }

  if (!offer.enabled) return null;
  return <>
    <Button onClick={() => setOpen(true)} className="fixed bottom-20 right-4 z-40 h-11 rounded-md bg-accent px-4 font-bold text-accent-foreground shadow-card hover:bg-accent/90 md:bottom-6 md:right-6"><Gift className="size-4" />Diwali · 20% off</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-[860px] gap-0 overflow-y-auto rounded-lg border-border p-0 [&>button]:z-10 [&>button]:bg-background [&>button]:p-2 [&>button]:opacity-100">
        <div className="grid md:grid-cols-[1fr_1.05fr]">
          <div className="relative isolate overflow-hidden bg-depth p-6 text-primary-foreground md:p-8">
            <img src={festiveImage} alt="Brass diyas glowing for Diwali" width={1024} height={1024} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-depth/45" />
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent"><Sparkles className="size-4" />Kshitij Vivan · Diwali special</p>
            <DialogTitle className="mt-5 font-display text-3xl font-semibold leading-tight md:text-4xl">{offer.heading.split("\n").map((line, index) => <span key={index} className="block">{line}</span>)}</DialogTitle>
            <div className="mt-5 flex items-end gap-2 font-display text-accent"><span className="text-7xl font-bold leading-none md:text-8xl">{DIWALI_OFFER.discountPercent}%</span><span className="pb-1 text-3xl font-semibold">OFF</span></div>
            <DialogDescription className="mt-3 max-w-xs text-base leading-6 text-primary-foreground">On our 18 in 1, 12 in 1 and 6 in 1 courses.</DialogDescription>
            <p className="mt-6 flex items-center gap-2 font-semibold"><CheckCircle2 className="size-5 text-accent" />{DIWALI_OFFER.jobAssistancePercent}% job assistance</p>
            <p className="mt-2 max-w-xs text-xs leading-5 text-primary-foreground/85">Career support, not a guaranteed job or placement.</p>
            <p className="mt-5 text-xs font-medium text-primary-foreground md:mt-24">Offline in Ahmedabad · Live online</p>
          </div>
          <div className="bg-background p-6 md:p-8 md:pt-12">
            {submitted ? <div className="flex min-h-80 flex-col justify-center" role="status"><CheckCircle2 className="size-12 text-primary" /><h2 className="mt-5 font-display text-3xl font-semibold">You're on our list.</h2><p className="mt-3 leading-7 text-muted-foreground">Your Diwali enquiry has been received. Our team will contact you about your chosen course and offer details.</p><Button asChild variant="outline" className="mt-6"><a href={contact.phoneHref}><Phone />Call the Ahmedabad team</a></Button><Button variant="link" className="mt-3" onClick={() => setOpen(false)}>Continue exploring <ArrowRight /></Button></div> : <form onSubmit={submit} className="space-y-4">
              <div><h2 className="font-display text-2xl font-semibold">{offer.formHeading}</h2><p className="mt-1 text-sm text-muted-foreground">Choose your course. Let’s talk possibilities.</p></div>
              <fieldset><legend className="mb-2 text-sm font-semibold">I'm interested in</legend><div className="grid grid-cols-3 gap-2">{DIWALI_OFFER.bundles.map((item) => <Button key={item} type="button" variant={bundle === item ? "default" : "outline"} aria-pressed={bundle === item} onClick={() => setBundle(item)} className="h-16 flex-col gap-0 px-1"><span className="text-xl font-bold">{item.split(" ")[0]} in 1</span><span className="text-xs font-normal">course</span></Button>)}</div></fieldset>
              <div><Label htmlFor="diwali-name">Full name</Label><Input id="diwali-name" name="name" required minLength={2} maxLength={100} autoComplete="name" className="mt-1.5 h-11" /></div>
              <div><Label htmlFor="diwali-phone">Phone number</Label><Input id="diwali-phone" name="phone" type="tel" required minLength={7} maxLength={25} autoComplete="tel" placeholder="+91" className="mt-1.5 h-11" /></div>
              <div><Label htmlFor="diwali-mode">Preferred batch</Label><select id="diwali-mode" name="mode" className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm">{DIWALI_OFFER.modes.map((mode) => <option key={mode}>{mode}</option>)}</select></div>
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input name="consent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-primary" />I agree to be contacted by Kshitij Vivan about this enquiry.</label>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button disabled={busy} type="submit" className="h-12 w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90">{busy ? <><Loader2 className="animate-spin" />Sending…</> : <>Get my 20% offer <ArrowRight /></>}</Button>
              <p className="text-xs leading-5 text-muted-foreground">Fees, course inclusions and offer details: ask our team.</p>
            </form>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}