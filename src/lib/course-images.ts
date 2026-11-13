import brand from '@/assets/project-brand.jpg';
import character from '@/assets/project-character.jpg';
import motion from '@/assets/project-motion.jpg';
import vfx from '@/assets/course-vfx.jpg';
import threeD from '@/assets/course-3d.jpg';
import uiux from '@/assets/course-product-design.jpg';
import design from '@/assets/course-design-still-life.jpg';
import film from '@/assets/course-filmmaking-studio.jpg';
import originalUiux from '@/assets/course-uiux.jpg';
import game from '@/assets/course-game.jpg';
import type { SiteContent } from './cms-schema';

const legacy = new Set([brand, character, motion, '/src/assets/project-brand.jpg', '/src/assets/project-character.jpg', '/src/assets/project-motion.jpg']);
const bySlug: Record<string, string> = { 'graphic-brand-design': design, '3d-animation': threeD, 'vfx-compositing': vfx, 'ui-ux-web-design': uiux, 'video-motion': film, 'game-design-creative-ai': game };

/** Swap bundled placeholder course images for dedicated ones; owner-uploaded images stay untouched. */
export function withCourseImages(content: SiteContent): SiteContent {
  return { ...content, programs: content.programs.map(p => { const next = bySlug[p.slug]; return (legacy.has(p.image) || p.image === originalUiux || p.image === '/src/assets/course-uiux.jpg') && next ? { ...p, image: next } : p; }) };
}
