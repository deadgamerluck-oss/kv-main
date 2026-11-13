import { describe, expect, it } from 'vitest';
import { enquiryOptions } from '@/lib/course-navigation';
import { headquarters } from '@/lib/site-seo';

describe('Course choice and headquarters rules', () => {
  it('offers the main 18 in 1 course for enquiries', () => {
    expect(enquiryOptions([]).courses).toContain('18 in 1 AI Graphics & Video Course');
  });
  it('offers 12 in 1 courses for enquiries', () => {
    expect(enquiryOptions([]).courses).toContain('12 in 1 AI Graphics Design Course');
  });
  it('offers the new 11 in 1 Digital Marketing course for enquiries', () => {
    expect(enquiryOptions([]).courses).toContain('11 in 1 Digital Marketing Course with AI');
  });
  it('offers 6 in 1 courses for enquiries', () => {
    expect(enquiryOptions([]).courses).toContain('6 in 1 Graphic Design Course');
  });
  it('keeps specialisations separate from the main course choices', () => {
    const options = enquiryOptions([{ title: '3D Animation' }]);
    expect(options.specialisations).toEqual(['3D Animation']);
    expect(options.courses).not.toContain('3D Animation');
  });
  it('identifies Ahmedabad as the headquarters', () => {
    expect(headquarters.address.addressLocality).toBe('Ahmedabad');
    expect(headquarters.location.geo.latitude).toBeCloseTo(23.0353704, 6);
    expect(headquarters.location.geo.longitude).toBeCloseTo(72.5631439, 6);
  });
  it('declares worldwide reach without pretending to have overseas offices', () => {
    expect(headquarters.areaServed).toBe('Worldwide');
    expect(headquarters.address.addressCountry).toBe('IN');
  });
});