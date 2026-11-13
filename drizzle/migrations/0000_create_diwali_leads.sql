CREATE TABLE public.diwali_leads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 25),
 bundle text NOT NULL CHECK (bundle IN ('18 in 1 course','12 in 1 course','6 in 1 course')),
 mode text NOT NULL CHECK (mode IN ('Offline — Ahmedabad','Live online')),
 discount_percent integer NOT NULL DEFAULT 20 CHECK (discount_percent = 20),
 campaign text NOT NULL DEFAULT 'diwali-2026',
 consent boolean NOT NULL CHECK (consent = true)
);
GRANT ALL ON public.diwali_leads TO service_role;
ALTER TABLE public.diwali_leads ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.lead_rate_limits (
 key text PRIMARY KEY,
 window_start timestamptz NOT NULL DEFAULT now(),
 attempts integer NOT NULL DEFAULT 1
);
GRANT ALL ON public.lead_rate_limits TO service_role;
ALTER TABLE public.lead_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.allow_lead_submission(rate_key text) RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE current_attempts integer;
BEGIN
 INSERT INTO public.lead_rate_limits AS r (key) VALUES (rate_key)
 ON CONFLICT (key) DO UPDATE SET
 attempts = CASE WHEN r.window_start < now() - interval '1 hour' THEN 1 ELSE r.attempts + 1 END,
 window_start = CASE WHEN r.window_start < now() - interval '1 hour' THEN now() ELSE r.window_start END
 RETURNING attempts INTO current_attempts;
 RETURN current_attempts <= 5;
END;
$$;
REVOKE ALL ON FUNCTION public.allow_lead_submission(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.allow_lead_submission(text) TO service_role;