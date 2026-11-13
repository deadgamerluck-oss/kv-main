import design from "@/assets/course-design-still-life.jpg";
import motion from "@/assets/course-filmmaking-studio.jpg";
import uiux from "@/assets/course-product-design.jpg";
import marketing from "@/assets/course-digital-marketing.jpg";

export type TierId = "18-in-1" | "11-in-1" | "12-in-1" | "6-in-1";

export type Course = {
  slug: string;
  tier: TierId;
  title: string;
  tagline: string;
  badge?: string;
  image: string;
  duration?: string;
  regularFee?: string;
  hybridFee?: string;
  mode: string;
  modules: { title: string; detail?: string }[];
  tools: string[];
  roles: string[];
  salary?: string;
};

export type Tier = { id: TierId; name: string; label: string; summary: string; bestFor: string };

export const tiers: Tier[] = [
  { id: "18-in-1", name: "18 in 1", label: "Master programme", summary: "Design, video and AI together — the most complete creative career course.", bestFor: "Learners who want every creative skill and the widest job options." },
  { id: "11-in-1", name: "11 in 1", label: "New launch", summary: "Digital marketing with AI — SEO, social, ads, automation and analytics in one course.", bestFor: "Learners, business owners and marketers who want to grow brands online." },
  { id: "12-in-1", name: "12 in 1", label: "Professional programme", summary: "Twelve career skills in one focused track: graphics & video, UI-UX or graphic design.", bestFor: "Learners who know their direction and want job-ready depth." },
  { id: "6-in-1", name: "6 in 1", label: "Career starter", summary: "Six essential skills in six months — the fastest route to your first job.", bestFor: "Beginners, students and career changers starting fresh." },
];

const counselling = "Ask at counselling";
const mode = "Classroom + hybrid with live classes";

export const courses: Course[] = [
  {
    slug: "18-in-1-ai-graphics-video",
    tier: "18-in-1",
    title: "AI Graphics & Video Course",
    tagline: "Master creative design, AI and video skills in one career-ready course.",
    badge: "Flagship",
    image: design,
    mode,
    modules: [
      { title: "Graphic Design Fundamentals" }, { title: "Branding & Logo Design" }, { title: "Print & Publication Design" },
      { title: "Web Design" }, { title: "UI Design" }, { title: "UX Design" },
      { title: "Packaging Design" }, { title: "Typography & Layout" }, { title: "Advertising & Campaign Design" },
      { title: "Social Media Design" }, { title: "Digital Illustration" }, { title: "Motion Graphics" },
      { title: "Video Editing" }, { title: "Reels & Short-Form Video" }, { title: "AI Image Generation" },
      { title: "AI Video Generation" }, { title: "Generative AI for Designers" }, { title: "Portfolio & Freelancing" },
    ],
    tools: ["Photoshop", "Illustrator", "CorelDRAW", "InDesign", "Figma", "Premiere Pro", "After Effects", "Audition", "Adobe Firefly", "Midjourney", "ChatGPT", "AI video tools"],
    roles: ["Graphic designer", "Video editor", "Motion designer", "UI designer", "Social media designer", "AI content creator", "Freelancer"],
  },
  {
    slug: "11-in-1-digital-marketing",
    tier: "11-in-1",
    title: "Digital Marketing Course with AI",
    tagline: "Plan, run and scale campaigns across search, social, ads and automation — powered by AI.",
    badge: "New launch",
    image: marketing,
    mode,
    modules: [
      { title: "Foundations of Digital Marketing", detail: "Segmentation, funnel, channel mix & AI website creation" },
      { title: "Social Media for Growth", detail: "Engagement, copywriting, GenAI content & influencers" },
      { title: "SEO Strategy & Optimisation", detail: "AEO, keywords, on/off-page, technical & ecommerce SEO" },
      { title: "Email & Mobile Marketing", detail: "Email automation, WhatsApp campaigns & retention" },
      { title: "Running Meta Ads", detail: "Facebook & Instagram targeting, creatives & optimisation" },
      { title: "Running Google Ads", detail: "Search campaigns, keywords & conversion rate optimisation" },
      { title: "Marketing Automation & Agentic AI", detail: "CRM workflows, triggers & AI agent building" },
      { title: "Programmatic & Affiliate Advertising", detail: "DSPs, SSPs, affiliate networks & cost models" },
      { title: "Web & App Analytics", detail: "GA4, Firebase, CleverTap, attribution & dashboards" },
      { title: "Media Planning & IMC", detail: "Integrated media plans, ROI & campaign pitching" },
      { title: "Scaling Businesses with Marketing", detail: "D2C, ROI, attribution & revenue forecasting" },
    ],
    tools: ["Meta Ads Manager", "Google Ads", "GA4", "Firebase", "CleverTap", "CRM tools", "ChatGPT", "AI content tools"],
    roles: ["Digital marketing executive", "SEO specialist", "Social media manager", "Performance marketer", "Marketing automation specialist", "Freelancer"],
  },
  {
    slug: "12-in-1-graphic-video",
    tier: "12-in-1",
    title: "Graphic & Video Course",
    tagline: "Design it. Edit it. Animate it. One course for a complete creative career.",
    badge: "Popular",
    image: motion,
    duration: "8 months",
    regularFee: "₹1,20,000",
    hybridFee: "₹90,000",
    mode,
    modules: [
      { title: "Branding & Logo Design", detail: "Logos, identity & brand stationery" },
      { title: "Print & Publication", detail: "Magazines, newspapers & brochures" },
      { title: "Advertising Design", detail: "Hoardings, billboards & standees" },
      { title: "Packaging Design", detail: "Labels, boxes, pouches & mock-ups" },
      { title: "Social Media & Thumbnails", detail: "Posts, ads & YouTube thumbnails" },
      { title: "Web & App UI", detail: "Website, app & game UI screens" },
      { title: "Illustration & Comics", detail: "Comics, T-shirt & digital art" },
      { title: "Photo Editing & Albums", detail: "Restoration, retouching & albums" },
      { title: "Video Editing", detail: "Wedding, vlog, ads & documentary" },
      { title: "Motion Graphics", detail: "Title, poster & infographic animation" },
      { title: "Audio Editing", detail: "Voice, podcast & music cleanup" },
      { title: "AI Design & Video", detail: "Firefly & AI tools for faster work" },
    ],
    tools: ["Photoshop", "Illustrator", "CorelDRAW", "InDesign", "Premiere Pro", "Audition", "After Effects", "Adobe Firefly", "AI tools"],
    roles: ["Graphic designer", "Video editor", "Motion graphics artist", "Social media designer", "Freelancer"],
    salary: "₹2.8L – ₹8.5L+ per year",
  },
  {
    slug: "12-in-1-ui-ux-design",
    tier: "12-in-1",
    title: "UI-UX Design Course",
    tagline: "Design apps, websites and game screens — finish with a UI-UX portfolio.",
    image: uiux,
    duration: "11 months",
    regularFee: "₹1,40,000",
    hybridFee: "₹1,00,000",
    mode,
    modules: [
      { title: "App UI Design", detail: "Mobile screens, flows & app layouts" },
      { title: "Web Design", detail: "Landing pages & responsive websites" },
      { title: "Game UI Design", detail: "Game screens, HUDs & store UI" },
      { title: "Buttons & Components", detail: "Buttons, icon sets & UI kits" },
      { title: "Character Design", detail: "App mascots & character UI" },
      { title: "Logo Design", detail: "Logos for e-commerce & app brands" },
      { title: "Icon Design", detail: "Commercial & flat icon sets" },
      { title: "Social Media Design", detail: "Banners, posts & ad creatives" },
      { title: "Photo Editing", detail: "Retouching & app visuals" },
      { title: "Web Motion", detail: "Animated web & UI motion" },
      { title: "Prototyping", detail: "Interactive Figma prototypes" },
      { title: "AI for Design", detail: "Prompts & AI-generated visuals" },
    ],
    tools: ["Figma", "Photoshop", "Illustrator", "CorelDRAW", "InDesign", "Premiere Pro", "After Effects", "Adobe Firefly", "ChatGPT", "AI tools"],
    roles: ["UI designer", "UX designer", "Web designer", "App designer", "Game UI designer"],
    salary: "₹2.4L – ₹7.5L+ per year",
  },
  {
    slug: "12-in-1-graphics-design",
    tier: "12-in-1",
    title: "AI Graphics Design Course",
    tagline: "Twelve design specialisations with AI tools — upgrade your skills, build a future in design.",
    image: design,
    mode,
    modules: [
      { title: "Branding Design" }, { title: "Print Design" }, { title: "Web Design" },
      { title: "User Interface Design" }, { title: "User Experience Design" }, { title: "Motion Graphics Design" },
      { title: "Packaging Design" }, { title: "Typography Design" }, { title: "Advertising Design" },
      { title: "Social Media Graphics" }, { title: "Illustration" }, { title: "Digital Illustration" },
    ],
    tools: ["Photoshop", "Illustrator", "CorelDRAW", "InDesign", "Figma", "After Effects", "Adobe Firefly", "AI tools"],
    roles: ["Graphic designer", "Brand designer", "Packaging designer", "Illustrator", "UI designer"],
  },
  {
    slug: "6-in-1-graphic-design",
    tier: "6-in-1",
    title: "Graphic Design Course",
    tagline: "You don't learn just Photoshop — you get 6 career-ready skills in 1 course.",
    badge: "Most preferred",
    image: design,
    duration: "6 months",
    regularFee: "₹60,000",
    hybridFee: "₹40,000",
    mode,
    modules: [
      { title: "Branding Design", detail: "Logos, visual identity, stationery & brand guidelines" },
      { title: "Print Design", detail: "Brochures, flyers, posters, catalogues & magazines" },
      { title: "Advertising Design", detail: "Hoardings, print ads & complete campaign creatives" },
      { title: "Packaging Design", detail: "Labels, boxes, pouches & realistic product mock-ups" },
      { title: "Social Media Graphics", detail: "Posts, stories, thumbnails & paid ad creatives" },
      { title: "Typography Design", detail: "Type layouts, lettering & creative headline design" },
    ],
    tools: ["Photoshop", "CorelDRAW", "Illustrator", "InDesign", "Adobe Firefly", "ChatGPT", "AI tools"],
    roles: ["Graphic designer", "Brand designer", "Social media designer", "Print designer"],
    salary: "₹2.4L – ₹7.5L+ per year",
  },
  {
    slug: "6-in-1-video-editing",
    tier: "6-in-1",
    title: "Video Editing Course",
    tagline: "Edit films, reels and ads that people stop scrolling to watch.",
    image: motion,
    duration: "6 months",
    regularFee: "₹60,000",
    hybridFee: "₹40,000",
    mode,
    modules: [
      { title: "AI Video Editing", detail: "AI cuts, captions, voice & smart enhancement" },
      { title: "Cinematic Video Editing", detail: "Story, pacing & colour grading for a film look" },
      { title: "Instagram Reels Creator", detail: "Trending reels with audio, text & effects" },
      { title: "Wedding Video Editor", detail: "Invitations, teasers & full wedding films" },
      { title: "YouTube Shorts Creator", detail: "Fast-paced shorts made for retention" },
      { title: "Social Media Video Editing", detail: "Reels & Shorts for brands and creators" },
    ],
    tools: ["Premiere Pro", "After Effects", "Photoshop", "Audition", "Adobe Firefly", "AI tools"],
    roles: ["Video editor", "Reels creator", "Wedding film editor", "YouTube editor"],
    salary: "₹2.4L – ₹7.5L+ per year",
  },
];

export const feeLabel = (fee?: string) => fee ?? counselling;
export const coursesInTier = (tier: TierId) => courses.filter((c) => c.tier === tier);
export const findCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const benefits = [
  "Latest software upgradation",
  "Grooming & personality development",
  "Practical exams & assignments",
  "Monthly events, seminars & workshops",
  "24/7 learning app",
  "Placement support through 700+ hiring partners",
];

export const journey = ["Free counselling", "Enrollment", "Learn the modules", "Portfolio", "Grooming", "Placement"];
