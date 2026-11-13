import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { cmsSchema, leadStatusSchema } from './cms-schema';

export const getPublicContent = createServerFn({ method: 'GET' }).handler(async () => {
 const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
 if (!url || !key) return null;
 try {
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_')) headers.delete('Authorization'); headers.set('apikey', key); return fetch(input, { ...init, headers }); } } });
  const { data, error } = await client.from('website_content').select('published').eq('key', 'site').maybeSingle();
  if (error) {
   console.warn('Could not fetch website content from database, falling back to bundled defaults:', error.message);
   return null;
  }
  const parsed = cmsSchema.safeParse(data?.published);
  return parsed.success ? { ...parsed.data, articles: parsed.data.articles.filter(a => a.status === 'published') } : null;
 } catch (err) {
  console.warn('Website content request failed, falling back to bundled defaults:', err instanceof Error ? err.message : err);
  return null;
 }
});

export const getAdminData = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
 const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
 if (roleError || !allowed) throw new Error('This account does not have administrator access.');
 const [content, diwali, enquiries, history, popups] = await Promise.all([
  context.supabase.from('website_content').select('*').eq('key', 'site').maybeSingle(),
  context.supabase.from('diwali_leads').select('*').order('created_at', { ascending: false }).limit(1000),
  context.supabase.from('consultation_submissions').select('*').order('created_at', { ascending: false }).limit(1000),
  context.supabase.from('content_history').select('id, created_at, action, content').order('created_at', { ascending: false }).limit(20),
  context.supabase.from('popup_leads').select('*').order('created_at', { ascending: false }).limit(1000),
 ]);
 if ([content, diwali, enquiries, history, popups].some(r => r.error)) throw new Error('Unable to load the admin area.');
 return { content: content.data, diwali: diwali.data ?? [], enquiries: enquiries.data ?? [], history: history.data ?? [], popups: popups.data ?? [] };
});

export const saveContent = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
 .validator((v: unknown) => z.object({ content: cmsSchema, publish: z.boolean(), version: z.number().int().min(0) }).parse(v))
 .handler(async ({ data, context }) => {
  const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (!allowed) throw new Error('Administrator access required.');
  const { data: version, error } = await context.supabase.rpc('save_website_content', { payload: JSON.parse(JSON.stringify(data.content)), publish_now: data.publish, expected_version: data.version });
  if (error) throw new Error('Could not save. Reload to get the latest version and try again.');
  return { version };
 });

export const updateLead = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
 .validator((v: unknown) => z.object({ id: z.string().uuid(), source: z.enum(['diwali', 'consultation', 'popup']), status: leadStatusSchema, notes: z.string().max(5000) }).parse(v))
 .handler(async ({ data, context }) => {
  const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (!allowed) throw new Error('Administrator access required.');
  const { data: row, error } = await context.supabase.from(data.source === 'diwali' ? 'diwali_leads' : data.source === 'popup' ? 'popup_leads' : 'consultation_submissions').update({ status: data.status, notes: data.notes }).eq('id', data.id).select('id').single();
  if (error || !row) throw new Error('Could not update the enquiry.'); return { success: true };
 });