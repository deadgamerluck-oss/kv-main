import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, CheckCircle2, Gift, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSiteContent } from './content-provider';
import { campaignStorageKey, isCampaignActive, popupLeadSchema, type PopupCampaign } from '@/lib/popup-campaigns';
import { submitPopupLead } from '@/lib/popup-leads.functions';
import { DIWALI_OFFER } from '@/lib/diwali-offer';
import festiveImage from '@/assets/november-sale.jpg';
import { NOVEMBER_SALE_ID } from '@/lib/popup-campaigns';

export function CampaignDialog({ campaign: c, open, onOpenChange, preview = false, page = '/' }: { campaign: PopupCampaign; open: boolean; onOpenChange: (v: boolean) => void; preview?: boolean; page?: string }) {
  const [submitted, setSubmitted] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const save = useServerFn(submitPopupLead);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return;
    const f = new FormData(e.currentTarget);
    const parsed = popupLeadSchema.safeParse({ campaign: c.id, name: f.get('name'), phone: f.get('phone'), interest: f.get('interest'), mode: f.get('mode'), consent: f.get('consent') === 'on', website: f.get('website'), page });
    if (!parsed.success) { setError('Please check your name, phone number and consent.'); return; }
    if (preview) { setSubmitted(true); return; }
    setBusy(true); setError('');
    try { await save({ data: parsed.data }); setSubmitted(true); } catch (err) { setError(err instanceof Error ? err.message : 'Please try again.'); } finally { setBusy(false); }
  }
  const image = c.image || ((c.id === DIWALI_OFFER.campaign || c.id === NOVEMBER_SALE_ID) ? festiveImage : '');
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-[860px] gap-0 overflow-y-auto rounded-lg p-0 [&>button]:z-10 [&>button]:bg-background [&>button]:p-2 [&>button]:opacity-100"><div className={c.goal === 'lead' ? 'grid md:grid-cols-2' : ''}><div className="relative isolate overflow-hidden bg-depth p-7 text-primary-foreground md:p-9">{image && <><img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-depth/75" /></>}<p className="text-sm font-bold text-accent">{c.badge}</p><DialogTitle className="mt-5 whitespace-pre-line font-display text-3xl font-semibold md:text-4xl">{c.heading}</DialogTitle><DialogDescription className="mt-5 whitespace-pre-line text-base leading-7 text-primary-foreground">{c.description}</DialogDescription><ul className="mt-7 space-y-3">{c.benefits.map((b, i) => <li key={i} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" />{b}</li>)}</ul>{c.goal === 'link' && <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"><a href={preview ? undefined : c.link} onClick={preview ? e => e.preventDefault() : undefined}>{c.buttonLabel}<ArrowRight /></a></Button>}</div>{c.goal === 'lead' && <div className="bg-background p-7 pt-12 md:p-9 md:pt-12">{submitted ? <div role="status" className="py-10"><CheckCircle2 className="size-12 text-primary" /><h2 className="mt-5 font-display text-3xl">Thank you.</h2><p className="mt-4 leading-7 text-muted-foreground">{c.successMessage}</p><Button variant="outline" className="mt-6" onClick={() => onOpenChange(false)}>Continue exploring<ArrowRight /></Button></div> : <form onSubmit={submit} className="space-y-4"><h2 className="font-display text-2xl font-semibold">{c.formHeading}</h2><div><Label htmlFor="popup-interest">Interested in</Label><select id="popup-interest" name="interest" className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm">{c.options.map(o => <option key={o}>{o}</option>)}</select></div><div><Label htmlFor="popup-name">Full name</Label><Input id="popup-name" name="name" required minLength={2} maxLength={100} autoComplete="name" className="mt-2 h-11" /></div><div><Label htmlFor="popup-phone">Phone number</Label><Input id="popup-phone" name="phone" type="tel" required minLength={7} maxLength={25} autoComplete="tel" className="mt-2 h-11" /></div><div><Label htmlFor="popup-mode">Preferred batch</Label><select id="popup-mode" name="mode" className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm">{DIWALI_OFFER.modes.map(m => <option key={m}>{m}</option>)}</select></div><input name="website" className="hidden" tabIndex={-1} autoComplete="off" /><label className="flex gap-2 text-xs leading-5 text-muted-foreground"><input name="consent" type="checkbox" required className="mt-1 shrink-0" />I agree to be contacted by Kshitij Vivan about this enquiry.</label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy} className="h-auto min-h-12 w-full whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90">{busy ? <Loader2 className="animate-spin" /> : <ArrowRight />}{c.buttonLabel}</Button></form>}</div>}</div></DialogContent></Dialog>;
}

export function CampaignPopups() {
  const { popups } = useSiteContent(); const pathname = useRouterState({ select: s => s.location.pathname });
  const [clock, setClock] = useState(() => Date.now()); const [selected, setSelected] = useState<PopupCampaign | null>(null); const autoShown = useRef(false); const sessionSeen = useRef(new Set<string>());
  useEffect(() => { const timer = window.setInterval(() => setClock(Date.now()), 15000); return () => window.clearInterval(timer); }, []);
  const active = popups.filter(c => isCampaignActive(c, pathname, clock)).sort((a, b) => b.priority - a.priority);
  const activeIds = active.map(c => c.id).join(',');
  useEffect(() => {
    const candidates = popups.filter(c => isCampaignActive(c, pathname) && c.trigger !== 'manual').sort((a, b) => b.priority - a.priority);
    const timers: number[] = [];
    const show = (c: PopupCampaign) => {
      if (autoShown.current || sessionSeen.current.has(c.id) || document.visibilityState !== 'visible' || document.querySelector('[role="dialog"]') || document.activeElement?.matches('input, textarea, select')) return;
      try { if (localStorage.getItem(campaignStorageKey(c.id)) === 'seen') return; localStorage.setItem(campaignStorageKey(c.id), 'seen'); } catch { /* Restricted storage: session fallback. */ }
      sessionSeen.current.add(c.id); autoShown.current = true; setSelected(c);
    };
    candidates.forEach(c => { if (c.trigger === 'delay' || c.trigger === 'both') timers.push(window.setTimeout(() => show(c), c.delaySeconds * 1000)); });
    const exit = (e: MouseEvent) => { if (e.clientY <= 0 && e.relatedTarget === null) candidates.filter(c => c.trigger === 'exit' || c.trigger === 'both').forEach(show); };
    document.addEventListener('mouseout', exit); return () => { timers.forEach(window.clearTimeout); document.removeEventListener('mouseout', exit); };
  }, [popups, pathname, activeIds]);
  const floating = active.find(c => c.floatingButton);
  return <>{floating && <Button onClick={() => setSelected(floating)} className="fixed bottom-20 right-4 z-40 h-auto max-w-[240px] whitespace-normal bg-accent text-accent-foreground shadow-card hover:bg-accent/90 md:bottom-6 md:right-6"><Gift className="size-4 shrink-0" />{floating.badge || floating.name}</Button>}{selected && <CampaignDialog key={selected.id} campaign={selected} page={pathname} open={isCampaignActive(selected, pathname, clock)} onOpenChange={v => { if (!v) setSelected(null); }} />}</>;
}