import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { consultationSchema } from './cms-schema';
export const submitConsultation = createServerFn({ method: 'POST' }).validator((v: unknown) => consultationSchema.parse(v)).handler(async ({ data }) => {
 const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
 const identity = getRequestHeader('cf-connecting-ip') ?? data.phone.replace(/\D/g, '');
 const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`consultation:${identity}`));
 const key = Array.from(new Uint8Array(hash), v => v.toString(16).padStart(2, '0')).join('');
 const { data: allowed, error: rateError } = await supabaseAdmin.rpc('allow_lead_submission', { rate_key: key });
 if (rateError || !allowed) throw new Error('Please try again later or call the team.');
 const { website, ...entry } = data; void website;
 const { error } = await supabaseAdmin.from('consultation_submissions').insert(entry);
 if (error) throw new Error('Could not save your enquiry. Please try again.');
 return { success: true };
});