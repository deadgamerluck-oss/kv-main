import { z } from 'zod';
import { DIWALI_OFFER } from './diwali-offer';

const copy = z.string().trim().min(1).max(5000);
const date = z.string().refine(v => !v || !Number.isNaN(Date.parse(v)), 'Choose a valid date.');
export const popupSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/).max(100), name: copy, enabled: z.boolean(),
  heading: copy, description: copy, badge: z.string().max(100), benefits: z.array(copy).max(10),
  image: z.string().max(2000).refine(v => !v || v.startsWith('/assets/') || v.startsWith('/src/assets/') || v.startsWith('https://'), 'Use an HTTPS image URL.'),
  buttonLabel: copy, formHeading: copy, successMessage: copy, options: z.array(copy.max(200)).min(1).max(20),
  goal: z.enum(['lead', 'link']), link: z.string().max(2000).refine(v => /^\/(?!\/)/.test(v) || /^https:\/\//.test(v), 'Use a website path or HTTPS URL.'),
  trigger: z.enum(['delay', 'exit', 'both', 'manual']), delaySeconds: z.number().int().min(0).max(120),
  startsAt: date, endsAt: date, pages: z.array(z.string().regex(/^\/(?!\/)/)).max(30),
  priority: z.number().int().min(0).max(100), floatingButton: z.boolean(),
}).refine(v => !v.startsAt || !v.endsAt || Date.parse(v.startsAt) < Date.parse(v.endsAt), 'End date must follow start date.');
export type PopupCampaign = z.infer<typeof popupSchema>;
export function legacyPopup(offer: { enabled: boolean; heading: string; formHeading: string; delaySeconds: number }): PopupCampaign {
  return { id: DIWALI_OFFER.campaign, name: 'Diwali course offer', ...offer, description: 'On our 18 in 1, 12 in 1 and 6 in 1 courses.', badge: '20% OFF · Diwali special', benefits: ['100% job assistance', 'Career support, not a guaranteed job or placement.', 'Offline in Ahmedabad · Live online'], image: '', buttonLabel: 'Get my 20% offer', successMessage: 'Your enquiry has been received. Our team will contact you about your chosen course and offer details.', options: [...DIWALI_OFFER.bundles], goal: 'lead', link: '/contact', trigger: 'both', startsAt: '', endsAt: '', pages: [], priority: 50, floatingButton: true };
}
export function isCampaignActive(c: PopupCampaign, pathname: string, now = Date.now()) {
  return c.enabled && (!c.startsAt || now >= Date.parse(c.startsAt)) && (!c.endsAt || now < Date.parse(c.endsAt)) && (!c.pages.length || c.pages.some(p => pathname === p || (p !== '/' && pathname.startsWith(`${p}/`))));
}
export function campaignStorageKey(id: string) { return id === DIWALI_OFFER.campaign ? DIWALI_OFFER.storageKey : `kv-popup-${id}-seen`; }
export const popupLeadSchema = z.object({ campaign: z.string().regex(/^[a-z0-9-]+$/).max(100), name: z.string().trim().min(2).max(100), phone: z.string().trim().min(7).max(25).regex(/^\+?[\d\s()-]+$/).refine(v => v.replace(/\D/g, '').length >= 7), interest: z.string().trim().min(1).max(200), mode: z.enum(DIWALI_OFFER.modes), consent: z.literal(true), website: z.string().max(0).default(''), page: z.string().regex(/^\/(?!\/)/).max(500) });
export const NOVEMBER_SALE_ID = 'high-save-november-2026';
/** Seasonal replacement for the finished Diwali offer; same lead form and options. */
export function novemberSale(base: PopupCampaign): PopupCampaign {
  return { ...base, id: NOVEMBER_SALE_ID, name: '#HighSaveNovember sale', heading: '#HighSaveNovember\nBig skills. Bigger savings.', description: 'Save 20% on our 18 in 1, 12 in 1, 6 in 1 and new Digital Marketing courses — this November only.', badge: '20% OFF · #HighSaveNovember', benefits: ['100% job assistance', 'Career support, not a guaranteed job or placement.', 'Offline in Ahmedabad · Live online'], image: '', buttonLabel: 'Claim my November offer', formHeading: 'Lock in your November saving', options: ['18 in 1 course', '11 in 1 Digital Marketing course', '12 in 1 course', '6 in 1 course'], startsAt: '', endsAt: '2026-12-01T00:00:00+05:30' };
}
/** Swap any Diwali-era campaign for the November sale; owner-created campaigns stay untouched. */
export function retireDiwali(popups: PopupCampaign[]): PopupCampaign[] {
  return popups.map(c => (c.id === DIWALI_OFFER.campaign || /diwali/i.test(c.name + c.badge + c.formHeading)) ? novemberSale(c) : c);
}
