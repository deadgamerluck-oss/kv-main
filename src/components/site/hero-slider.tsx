import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Pause, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from './content-provider';
import vfxImage from '@/assets/course-design-still-life.jpg';
import gameImage from '@/assets/hero-game-world.jpg';
import graphicImage from '@/assets/course-filmmaking-studio.jpg';
import originalHero from '@/assets/creative-studio-hero.jpg';
import originalCharacter from '@/assets/project-character.jpg';
import originalMotion from '@/assets/project-motion.jpg';
import previousHero from '@/assets/creative-futures.jpg';

const bannerImages = [
  { legacy: [originalHero, previousHero, '/src/assets/creative-studio-hero.jpg', '/src/assets/creative-futures.jpg'], image: vfxImage, alt: 'Creative packaging and editorial design composition' },
  { legacy: [originalCharacter, '/src/assets/project-character.jpg'], image: gameImage, alt: 'Game character and robot companion exploring a detailed floating island world' },
  { legacy: [originalMotion, '/src/assets/project-motion.jpg'], image: graphicImage, alt: 'Professional filmmaking equipment in a creative studio' },
];

export function HeroSlider() {
  const { slides } = useSiteContent();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cur = slides[i] ?? slides[0];
  const go = (n: number) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    if (paused || hovered || reducedMotion) return;
    const t = setTimeout(() => go(i + 1), 6500);
    return () => clearTimeout(t);
  }, [i, paused, hovered, reducedMotion]);
  useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); setReducedMotion(media.matches); const change = () => setReducedMotion(media.matches); media.addEventListener('change', change); return () => media.removeEventListener('change', change); }, []);

  if (!cur) return null;
  return (
    <section
      aria-label="Creative courses, learner reach and career possibilities"
      aria-roledescription="carousel"
      className={`relative isolate overflow-hidden ${i === 0 ? 'bg-background text-foreground' : 'bg-depth text-primary-foreground'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false); }}
    >
      {slides.map((s, idx) => {
        const replacement = bannerImages[idx];
        const visual = replacement && replacement.legacy.includes(s.image) ? replacement : s;
        return <img key={idx} src={visual.image} alt={idx === i ? visual.alt : ''} aria-hidden={idx !== i} width={1920} height={1024} loading={idx === 0 ? 'eager' : 'lazy'} fetchPriority={idx === 0 ? 'high' : 'auto'} className={`absolute inset-0 -z-20 size-full object-cover object-[75%_center] transition-opacity duration-700 md:object-right ${idx === i ? 'opacity-100' : 'opacity-0'}`} />;
      })}
      <div className={`absolute inset-0 -z-10 ${i === 0 ? 'bg-background/85 md:bg-linear-to-r md:from-background/95 md:via-background/40 md:via-45% md:to-background/0 md:to-75% md:bg-transparent' : 'bg-depth/85 md:bg-linear-to-r md:from-depth/95 md:via-depth/50 md:via-45% md:to-depth/0 md:to-75% md:bg-transparent'}`} />

      <div className="relative mx-auto flex min-h-[560px] max-w-[1440px] flex-col px-5 pb-5 pt-8 md:h-[590px] md:px-8 md:pt-12 lg:px-12">
        <div key={i} className="max-w-[560px] animate-in fade-in duration-500 md:w-[48%]" aria-live={paused ? 'polite' : 'off'}>
          <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] ${i === 0 ? 'text-primary' : 'text-accent'}`}><span className="size-1.5 bg-accent" />{cur.kicker}</p>
          <h1 className="mt-5 font-display text-xl font-semibold">Kshitij Vivan</h1>
          <p className="mt-3 min-h-[130px] max-w-[550px] font-display text-4xl font-semibold leading-[1.08] md:min-h-[156px] md:text-5xl xl:text-6xl">{cur.lines.join(' ')}</p>
          <p className={`mt-4 max-w-[460px] text-sm leading-6 md:text-base md:leading-7 ${i === 0 ? 'text-foreground/80' : 'text-primary-foreground/85'}`}>{i === 0 && cur.copy === 'Graphic Design, 3D Animation, VFX, UI/UX, Video & Motion and Game Design — structured, module-by-module courses with mentor feedback.' ? 'Choose 18 in 1, 12 in 1 or 6 in 1 courses in graphic design, video, UI-UX and creative AI. Learn live online or at our Ahmedabad headquarters.' : cur.copy}</p>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-7">
            <Button asChild className="h-12 bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"><Link to={cur.cta.to === "/programs" ? "/courses" : cur.cta.to}>{cur.cta.label}<ArrowRight className="size-4" /></Link></Button>
            <Button asChild variant="outline" className={`h-12 px-5 font-semibold ${i === 0 ? 'border-foreground/30 bg-background/65' : 'border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-depth'}`}><Link to="/contact">Talk to a course advisor</Link></Button>
          </div>
          <div className="mt-4 flex max-w-[480px] flex-wrap gap-x-5 gap-y-2 md:mt-6">{cur.chips.slice(0, 2).map(c => <span key={c} className="flex items-center gap-2 text-xs font-semibold"><Check className={`size-3.5 ${i === 0 ? 'text-primary' : 'text-accent'}`} />{c === '6 creative programmes' ? '18 in 1 · 12 in 1 · 6 in 1' : c}</span>)}</div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-8">
          <Button aria-label="Previous slide" variant="outline" size="icon" className="size-9 bg-background text-foreground" onClick={() => go(i - 1)}><ArrowLeft className="size-4" /></Button>
          <Button aria-label="Next slide" variant="outline" size="icon" className="size-9 bg-background text-foreground" onClick={() => go(i + 1)}><ArrowRight className="size-4" /></Button>
          <div className="mx-3 flex gap-1">{slides.map((_, idx) => <Button key={idx} variant="ghost" size="icon" aria-label={`Go to slide ${idx + 1}`} aria-current={idx === i} onClick={() => go(idx)} className="size-8"><span className={`h-1.5 w-5 rounded-sm ${idx === i ? 'bg-accent' : i === 0 ? 'bg-primary/25' : 'bg-primary-foreground/30'}`} /></Button>)}</div>
          <Button variant="ghost" size="icon" className="size-8" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused(!paused)}>{paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}</Button>
          <span className="ml-3 text-xs font-semibold">0{i + 1} / 0{slides.length}</span>
        </div>
      </div>
    </section>
  );
}
