import { describe, expect, it } from "vitest";
import { DIWALI_OFFER, diwaliLeadSchema, shouldShowOffer } from "@/lib/diwali-offer";

describe("Owner-confirmed Diwali offer", () => {
  it("offers 20% off", () => { expect(DIWALI_OFFER.discountPercent).toBe(20); });
  it("offers 100% job assistance", () => { expect(DIWALI_OFFER.jobAssistancePercent).toBe(100); });
  it("targets the three confirmed bundles", () => {
    expect(DIWALI_OFFER.bundles).toEqual(["18 in 1 course", "12 in 1 course", "6 in 1 course"]);
  });
  it("automatically shows only once", () => {
    expect(shouldShowOffer(null)).toBe(true);
    expect(shouldShowOffer("seen")).toBe(false);
  });
  it("rejects missing consent and unknown bundles", () => {
    const valid = { name: "Test Visitor", phone: "+919876543210", bundle: "18 in 1 course", mode: "Live online", consent: true };
    expect(diwaliLeadSchema.safeParse(valid).success).toBe(true);
    expect(diwaliLeadSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(diwaliLeadSchema.safeParse({ ...valid, bundle: "24 in 1 course" }).success).toBe(false);
  });
});