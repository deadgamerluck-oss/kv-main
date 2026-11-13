import { describe, expect, it } from 'vitest';
import { campaignStorageKey, isCampaignActive, legacyPopup, popupLeadSchema } from '@/lib/popup-campaigns';
import { articleSchema, cmsSchema } from '@/lib/cms-schema';
import { defaultContent } from '@/components/site/content-provider';
const popup = legacyPopup({ enabled: true, heading: 'Offer', formHeading: 'Enquire', delaySeconds: 10 });
describe('Campaign planner and blog controls', () => {
  it('keeps separate once-only keys for different campaigns and preserves Diwali history', () => { expect(campaignStorageKey('diwali-2026')).toBe('kv-diwali-2026-seen'); expect(campaignStorageKey('summer')).not.toBe(campaignStorageKey('winter')); });
  it('limits a popup to its scheduled interval', () => { const c = { ...popup, startsAt: '2026-11-01T00:00:00Z', endsAt: '2026-11-02T00:00:00Z' }; expect(isCampaignActive(c, '/', Date.parse('2026-11-01T12:00:00Z'))).toBe(true); expect(isCampaignActive(c, '/', Date.parse(c.endsAt))).toBe(false); });
  it('targets only the selected page and its children', () => { const c = { ...popup, pages: ['/programs'] }; expect(isCampaignActive(c, '/programs/animation')).toBe(true); expect(isCampaignActive(c, '/blog')).toBe(false); expect(isCampaignActive(c, '/programs-other')).toBe(false); });
  it('does not display paused campaigns', () => { expect(isCampaignActive({ ...popup, enabled: false }, '/')).toBe(false); });
  it('rejects a schedule ending before it begins', () => { expect(cmsSchema.safeParse({ ...defaultContent, popups: [{ ...popup, startsAt: '2026-11-02', endsAt: '2026-11-01' }] }).success).toBe(false); });
  it('requires consent and rejects spam fields on campaign leads', () => { const lead = { campaign: 'summer', name: 'Test Learner', phone: '+919000000000', interest: 'Animation', mode: 'Live online', consent: true, website: '', page: '/' }; expect(popupLeadSchema.safeParse(lead).success).toBe(true); expect(popupLeadSchema.safeParse({ ...lead, consent: false }).success).toBe(false); expect(popupLeadSchema.safeParse({ ...lead, website: 'bot' }).success).toBe(false); });
  it('supports draft blog posts while retaining existing published posts', () => { const base = { slug: 'guide', title: 'Guide', excerpt: 'Summary', date: '2026-11-03' }; expect(articleSchema.parse(base).status).toBe('published'); expect(articleSchema.parse({ ...base, status: 'draft' }).status).toBe('draft'); });
  it('rejects duplicate blog URLs', () => { const a = defaultContent.articles[0]; expect(cmsSchema.safeParse({ ...defaultContent, articles: [a, a] }).success).toBe(false); });
});
import { legacyPopup as lp, retireDiwali as rd, NOVEMBER_SALE_ID as NID, isCampaignActive as active } from '@/lib/popup-campaigns';
describe('November sale replaces Diwali offer', () => {
  const diwali = lp({ enabled: true, heading: 'x', formHeading: 'y', delaySeconds: 10 });
  it('swaps the Diwali popup for #HighSaveNovember', () => {
    const c = rd([diwali])[0]!;
    expect(c.id).toBe(NID);
    expect(c.badge).toContain('#HighSaveNovember');
    expect(c.options).toContain('11 in 1 Digital Marketing course');
  });
  it('ends on 1 December 2026 (India time)', () => {
    const c = rd([diwali])[0]!;
    expect(active(c, '/', Date.parse('2026-11-30T23:00:00+05:30'))).toBe(true);
    expect(active(c, '/', Date.parse('2026-12-01T00:00:00+05:30'))).toBe(false);
  });
});
