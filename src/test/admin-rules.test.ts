import { describe, expect, it } from 'vitest';
import { cmsSchema, isAdminRole, csvCell, consultationSchema } from '@/lib/cms-schema';
import { contact, programs, projects, commonFaqs, articles } from '@/data/site-content';
import { defaultSlides } from '@/data/hero-slides';
const site = { contact, programs, projects, commonFaqs, articles, slides: defaultSlides, heroes: {}, offer: { enabled: true, heading: 'Diwali', formHeading: 'Get offer', delaySeconds: 10 } };
describe('Owner and content rules', () => {
 it('only grants admin actions to an admin role', () => { expect(isAdminRole(['admin'])).toBe(true); expect(isAdminRole(['user'])).toBe(false); expect(isAdminRole([])).toBe(false); });
 it('keeps the sole physical centre in Ahmedabad', () => { expect(cmsSchema.safeParse(site).success).toBe(true); expect(cmsSchema.safeParse({ ...site, contact: { ...contact, address: 'Delhi office' } }).success).toBe(false); });
 it('keeps exactly three banners', () => { expect(cmsSchema.safeParse({ ...site, slides: defaultSlides.slice(0, 2) }).success).toBe(false); });
 it('rejects unsafe image URLs', () => { expect(cmsSchema.safeParse({ ...site, projects: [{ image: 'javascript:alert(1)', title: 'A', meta: 'B' }] }).success).toBe(false); });
 it('rejects filled spam fields on consultation submissions', () => { const input = { name: 'Test Learner', phone: '+919000000000', stage: 'In school or college', program: 'Animation', website: '' }; expect(consultationSchema.safeParse(input).success).toBe(true); expect(consultationSchema.safeParse({ ...input, website: 'spam' }).success).toBe(false); });
 it('neutralizes spreadsheet formulas in exported leads', () => { expect(csvCell('=1+1')).toBe('"\'=1+1"'); expect(csvCell('Lakshman')).toBe('"Lakshman"'); });
});