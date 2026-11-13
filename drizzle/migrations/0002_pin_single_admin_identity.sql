CREATE OR REPLACE FUNCTION public.assign_website_owner()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.id = '76e28d77-0bfa-451f-85e6-12793ff6f7cc'::uuid AND lower(NEW.email) = 'admina@kv.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;