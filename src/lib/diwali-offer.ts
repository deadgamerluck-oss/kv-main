import { z } from "zod";

export const DIWALI_OFFER = {
  campaign: "diwali-2026",
  storageKey: "kv-diwali-2026-seen",
  discountPercent: 20,
  jobAssistancePercent: 100,
  bundles: ["18 in 1 course", "12 in 1 course", "6 in 1 course"],
  modes: ["Offline — Ahmedabad", "Live online"],
  delayMs: 10000,
} as const;

export function shouldShowOffer(seen: string | null) { return seen !== "seen"; }

export const diwaliLeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z.string().trim().min(7).max(25).regex(/^\+?[\d\s()-]+$/, "Enter a valid phone number.")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number."),
  bundle: z.enum(DIWALI_OFFER.bundles),
  mode: z.enum(DIWALI_OFFER.modes),
  consent: z.literal(true),
  website: z.string().max(0).default(""),
});