import { z } from 'zod';
import { legacyPopup, popupSchema } from './popup-campaigns';

const text = z.string().trim().min(1).max(5000);
export const imageSchema = z.string().max(2000).refine(v => v.startsWith('/assets/') || v.startsWith('/src/assets/') || /^https:\/\//.test(v), 'Use an HTTPS image URL.');
const list = z.array(text).max(50);
export const articleSchema = z.object({ slug: z.string().regex(/^[a-z0-9-]+$/).max(150), title: text, excerpt: text, date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), body: z.string().max(100000).default(''), status: z.enum(['draft', 'published']).default('published'), image: imageSchema.or(z.literal('')).default(''), imageAlt: z.string().max(500).default(''), author: z.string().max(200).default('Kshitij Vivan'), category: z.string().max(200).default('Creative career guide'), seoTitle: z.string().max(200).default(''), seoDescription: z.string().max(500).default('') });
export type BlogArticle = z.infer<typeof articleSchema>;
export const programSchema = z.object({ slug: z.string().regex(/^[a-z0-9-]+$/), number: text, title: text, short: text, direction: text, intro: text, practice: list, outcomes: list, tools: list, roles: list, curriculum: z.array(z.object({ title: text, topics: list })).min(1).max(30), questions: z.array(z.tuple([text, text])).max(30), image: imageSchema });
export const slideSchema = z.object({ kicker: text, lines: z.tuple([text, text, text]), copy: text, image: imageSchema, alt: text, cta: z.object({ label: text, to: z.enum(['/programs', '/curriculum', '/work', '/contact']) }), chips: list });
export const cmsSchema = z.object({
  contact: z.object({ phone: z.string().min(7).max(30).regex(/^\+?[\d ()-]+$/), phoneHref: z.string().regex(/^tel:\+?\d+$/), whatsapp: z.string().regex(/^https:\/\/wa\.me\/\d+$/), email: z.string().email(), address: text.refine(v => /Ahmedabad/i.test(v), 'The physical centre must remain in Ahmedabad.') }),
  programs: z.array(programSchema).min(1).max(30).refine(v => new Set(v.map(p => p.slug)).size === v.length, 'Course URLs must be unique.'),
  projects: z.array(z.object({ image: imageSchema, title: text, meta: text })).max(50),
  commonFaqs: z.array(z.tuple([text, text])).max(50),
  articles: z.array(articleSchema).max(100).refine(v => new Set(v.map(a => a.slug)).size === v.length, 'Blog URLs must be unique.'),
  slides: z.array(slideSchema).length(3),
  heroes: z.record(z.object({ title: text, intro: text })).default({}),
  offer: z.object({ enabled: z.boolean(), heading: text, formHeading: text, delaySeconds: z.number().int().min(0).max(120) }),
  popups: z.array(popupSchema).max(30).refine(v => new Set(v.map(p => p.id)).size === v.length, 'Popup IDs must be unique.').optional(),
}).transform(v => ({ ...v, popups: v.popups ?? [legacyPopup(v.offer)] }));
export type SiteContent = z.infer<typeof cmsSchema>;
export const leadStatusSchema = z.enum(['new', 'contacted', 'enrolled', 'closed']);
export const consultationSchema = z.object({ name: z.string().trim().min(2).max(100), phone: z.string().trim().min(7).max(25).regex(/^\+?[\d\s()-]+$/), stage: z.enum(['In school or college', 'Recently graduated', 'Working and exploring a change', 'Exploring for someone else']), program: text.max(200), region: z.string().max(200).default(''), website: z.string().max(0).default('') });
export function isAdminRole(roles: string[]) { return roles.includes('admin'); }
export function csvCell(value: unknown) { const s = String(value ?? ''); return `"${(/^[=+@\-\t\r]/.test(s) ? "'" : '') + s.replace(/"/g, '""')}"`; }