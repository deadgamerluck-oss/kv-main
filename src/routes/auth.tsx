import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export const Route = createFileRoute('/auth')({ head: () => ({ meta: [{ title: 'Administrator sign in — Kshitij Vivan' }, { name: 'description', content: 'Secure owner access to Kshitij Vivan website content and enquiries.' }, { property: 'og:title', content: 'Administrator access — Kshitij Vivan' }, { property: 'og:description', content: 'Secure website management.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }), component: AuthPage });
function AuthPage() {
 const navigate = useNavigate(); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
 async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const email = z.string().email().safeParse(f.get('email')); if (!email.success) { setMessage('Enter a valid email.'); return; } const password = String(f.get('password') ?? ''); setBusy(true); setMessage('');
  try { const { error } = await supabase.auth.signInWithPassword({ email: email.data, password }); if(error) throw error; await navigate({ to: '/admin' });
 } catch(err) { setMessage(err instanceof Error ? err.message : 'Sign in failed.'); } finally { setBusy(false); } }
 return <main className="grid min-h-screen place-items-center bg-secondary px-5 py-12"><div className="w-full max-w-md"><ShieldCheck className="size-10 text-primary" /><p className="mt-6 text-sm font-bold text-primary">KSHITIJ VIVAN / OWNER</p><h1 className="mt-3 font-display text-4xl font-semibold">Admin access</h1><form onSubmit={submit} className="mt-8 space-y-5"><div><Label htmlFor="auth-email">Admin ID</Label><Input id="auth-email" name="email" type="email" required autoComplete="username" className="mt-2 h-12" /></div><div><Label htmlFor="auth-password">Password</Label><Input id="auth-password" name="password" type="password" required minLength={8} autoComplete="current-password" className="mt-2 h-12" /></div><Button disabled={busy} className="h-12 w-full">{busy ? 'Please wait…' : 'Open admin panel'}</Button></form>{message && <p role="status" className="mt-4 text-sm leading-6">{message}</p>}<Button asChild variant="link" className="mt-6"><Link to="/">Back to website</Link></Button></div></main>;
}