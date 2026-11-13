import { createContext, useContext, type ReactNode } from 'react';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { contact, programs, projects, commonFaqs, articles } from '@/data/site-content';
import { defaultSlides } from '@/data/hero-slides';
import { getPublicContent } from '@/lib/cms.functions';
import type { SiteContent } from '@/lib/cms-schema';
import { cmsSchema } from '@/lib/cms-schema';
import { withCourseImages } from '@/lib/course-images';
import { resolveImages } from '@/lib/resolve-images';
import { retireDiwali } from '@/lib/popup-campaigns';
export const defaultContent: SiteContent = cmsSchema.parse({ contact, programs, projects, commonFaqs, articles: articles.map(article => ({ ...article, body: '' })), slides: defaultSlides, heroes: {}, offer: { enabled: true, heading: 'A brighter start.\nA bumper offer.', formHeading: 'Lock in your November saving', delaySeconds: 10 } });
export const publicContentOptions = queryOptions({ queryKey: ['website-content'], queryFn: () => getPublicContent(), staleTime: 30000 });
const ContentContext = createContext<SiteContent>(defaultContent);
export function ContentProvider({ children }: { children: ReactNode }) { const { data } = useSuspenseQuery(publicContentOptions); return <ContentContext.Provider value={withSeason(data ?? defaultContent)}>{children}</ContentContext.Provider>; }
export function useSiteContent() { return useContext(ContentContext); }function withSeason(c: SiteContent): SiteContent { const r = resolveImages(withCourseImages(c)); return { ...r, popups: retireDiwali(r.popups) }; }
