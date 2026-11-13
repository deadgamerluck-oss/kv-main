import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { cmsSchema } from './cms-schema';
import { isCampaignActive, popupLeadSchema, retireDiwali } from './popup-campaigns';

export const submitPopupLead = createServerFn({ method: 'POST' }).inputValidator((input: unknown) => popupLeadSchema.parse(input)).handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: row, error: contentError } = await supabaseAdmin.from('website_content').select('published').eq('key', 'site').maybeSingle();
  const parsed = cmsSchema.safeParse(row?.published);
  if (contentError || !parsed.success) throw new Error('This offer is unavailable. Please contact our team.');
  const campaign = retireDiwali(parsed.data.popups).find(c => c.id === data.campaign);
  if (!campaign || campaign.goal !== 'lead' || !isCampaignActive(campaign, data.page) || !campaign.options.includes(data.interest)) throw new Error('This offer is no longer available. Please contact our team.');
  const ip = getRequestHeader('cf-connecting-ip') ?? getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim();
  for (const key of [`phone:${data.phone.replace(/\D/g, '')}`, ...(ip ? [`ip:${ip}`] : [])]) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
    const rateKey = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    const { data: allowed, error } = await supabaseAdmin.rpc('allow_lead_submission', { rate_key: rateKey });
    if (error || !allowed) throw new Error('Please try again later or call our team.');
  }
  const { error } = await supabaseAdmin.from('popup_leads').insert({ campaign: campaign.id, campaign_name: campaign.name, name: data.name, phone: data.phone, interest: data.interest, mode: data.mode, consent: data.consent });
  if (error) throw new Error('Your enquiry could not be saved. Please try again.');
  return { success: true };
});