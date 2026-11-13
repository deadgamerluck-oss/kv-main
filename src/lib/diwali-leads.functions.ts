import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { DIWALI_OFFER, diwaliLeadSchema } from "./diwali-offer";

export const submitDiwaliLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => diwaliLeadSchema.parse(input))
  .handler(async ({ data }) => {
    // This deliberately public endpoint may only create validated leads, never read them.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();
    const phone = data.phone.replace(/\D/g, "");
    const keys = [`phone:${phone}`, ...(ip ? [`ip:${ip}`] : [])];
    for (const key of keys) {
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
      const rateKey = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
      const { data: allowed, error } = await supabaseAdmin.rpc("allow_lead_submission", { rate_key: rateKey });
      if (error) throw new Error("We couldn't save your enquiry. Please try again.");
      if (!allowed) throw new Error("Too many requests. Please try again later or call us.");
    }
    const { error } = await supabaseAdmin.from("diwali_leads").insert({
      name: data.name, phone: data.phone, bundle: data.bundle, mode: data.mode,
      consent: data.consent, campaign: DIWALI_OFFER.campaign,
      discount_percent: DIWALI_OFFER.discountPercent,
    });
    if (error) throw new Error("We couldn't save your enquiry. Please try again.");
    return { success: true };
  });