import characterProject from "@/assets/project-character.jpg";
import motionProject from "@/assets/project-motion.jpg";
import brandProject from "@/assets/project-brand.jpg";

export const contact = {
  phone: "+91 91374 40042",
  phoneHref: "tel:+919137440042",
  whatsapp: "https://wa.me/919137440042",
  email: "satelliteroad@kshitijvivan.in",
  address: "302 A Wing, Ganesh Plaza, near Navrangpura Bus Stand, C.G. Road, Ahmedabad 380009",
};

export type Program = {
  slug: string;
  number: string;
  title: string;
  short: string;
  direction: string;
  intro: string;
  practice: string[];
  outcomes: string[];
  tools: string[];
  roles: string[];
  curriculum: { title: string; topics: string[] }[];
  questions: [string, string][];
  image: string;
};

export const programs: Program[] = [
  {
    slug: "graphic-brand-design",
    number: "01",
    title: "Graphic & Brand Design",
    short: "A 6-in-1 graphic design career programme covering AI-assisted design, branding, packaging, social creatives, UI visuals and portfolio development.",
    direction: "Brand designer · Visual designer",
    intro: "Explore the six learning areas published for Kshitij Vivan’s 6-in-1 Graphic Design Career Program: design with AI, brand identity, packaging, social media and ads, UI visuals, and portfolio plus freelancing.",
    practice: ["AI-assisted Photoshop and Illustrator workflows", "Logo and brand guidelines", "Packaging mockups and dielines", "Social posts, ads and UI visuals"],
    outcomes: ["A clearer visual design process", "Selected projects presented as case studies", "A direction for further specialisation"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe InDesign", "Midjourney", "Adobe Firefly", "Leonardo"],
    roles: ["Graphic designer", "Brand identity designer", "Visual designer", "Packaging designer", "Layout & editorial designer", "Social media designer"],
    curriculum: [
      { title: "Graphic Design with AI", topics: ["Photoshop", "Illustrator", "Midjourney and Firefly workflows"] },
      { title: "Brand Identity & Logo Design", topics: ["Logo", "Brand guidelines", "Visiting card and letterhead"] },
      { title: "Packaging Design", topics: ["Box and label", "Mockup and dieline", "FMCG and D2C packaging"] },
      { title: "Social Media & Ad Design", topics: ["Instagram posts and ads", "Thumbnails", "YouTube kits"] },
      { title: "UI Visuals for Graphic Designers", topics: ["Figma web and mobile visuals", "Landing sections"] },
      { title: "Portfolio + Freelancing Mastery", topics: ["Portfolio site", "Fiverr and Upwork client hunting"] },
    ],
    questions: [["Do I need to know drawing?", "Drawing can help, but visual thinking, observation, and consistent practice matter more at the starting stage."], ["Will I create portfolio work?", "The learning approach uses guided briefs and feedback so selected work can be refined and presented clearly."]],
    image: brandProject,
  },
  {
    slug: "3d-animation",
    number: "02",
    title: "3D Animation",
    short: "Build characters and environments from modelling through final animation.",
    direction: "3D artist · Animator",
    intro: "Understand how forms, materials, light, movement, and storytelling come together in a 3D production workflow.",
    practice: ["Modelling and form", "Materials, lighting, and rendering", "Character movement", "Shot planning and presentation"],
    outcomes: ["A working understanding of the 3D pipeline", "Focused modelling and animation studies", "Selected shots for a developing showreel"],
    tools: ["Autodesk Maya", "Blender", "ZBrush", "Substance Painter", "Adobe Photoshop"],
    roles: ["3D modeller", "Character animator", "Lighting & rendering artist", "Texturing artist", "3D generalist", "Rigging artist (further specialisation)"],
    curriculum: [
      { title: "3D foundations", topics: ["Understanding the 3D production pipeline", "Navigating 3D software with confidence", "Modelling: props and simple forms", "Topology and clean geometry", "Reference gathering and observation"] },
      { title: "Modelling & sculpting", topics: ["Hard-surface modelling", "Character and organic modelling", "Digital sculpting fundamentals", "Environment and set modelling", "UV mapping and preparation"] },
      { title: "Look development", topics: ["Texturing and material creation", "Hand-painted and PBR workflows", "Lighting setups and mood", "Rendering fundamentals", "Camera and composition"] },
      { title: "Animation principles", topics: ["The twelve principles of animation", "Timing, spacing, and weight", "Rigging basics and controls", "Body mechanics and movement studies", "Pose-to-pose and straight-ahead workflows"] },
      { title: "Character performance", topics: ["Acting and expression", "Lip-sync and dialogue shots", "Creature and prop animation", "Staging and cinematography", "Feedback and iteration"] },
      { title: "Showreel development", topics: ["Shot planning and pre-production", "Polishing selected shots", "Rendering and compositing basics", "Reel editing and presentation", "Preparing for studio applications"] },
    ],
    questions: [["Can beginners learn 3D animation?", "Yes. A suitable starting path can begin with visual foundations and gradually introduce the production workflow."], ["Is animation only about software?", "No. Observation, timing, storytelling, design, and repeated critique are equally important."]],
    image: characterProject,
  },
  {
    slug: "vfx-compositing",
    number: "03",
    title: "VFX & Compositing",
    short: "Develop cinematic shots using compositing, effects, tracking, and production workflows.",
    direction: "Compositor · VFX artist",
    intro: "Learn to analyse a shot, combine visual elements, and refine the details that help effects feel coherent on screen.",
    practice: ["Image integration and compositing", "Tracking and clean-up", "Colour and light matching", "Shot breakdown and review"],
    outcomes: ["A structured approach to building a VFX shot", "Before-and-after project breakdowns", "Selected work for a developing showreel"],
    tools: ["Adobe After Effects", "Nuke (foundations)", "Autodesk Maya", "Adobe Premiere Pro", "Mocha (tracking)"],
    roles: ["Compositor", "Roto & paint artist", "Matchmove artist", "Motion graphics artist", "VFX generalist", "FX artist (further specialisation)"],
    curriculum: [
      { title: "Compositing foundations", topics: ["How a VFX shot is built", "Layers, mattes, and alpha channels", "Keying and green-screen workflows", "Rotoscopy fundamentals", "Colour space and image quality"] },
      { title: "Integration skills", topics: ["Matchmoving and camera tracking", "Clean-up and paint work", "Colour and light matching", "Edge treatment and grain", "Shadows, reflections, and interaction"] },
      { title: "Motion graphics", topics: ["Motion typography and titles", "Shape-layer animation", "Expressions and automation basics", "Infographic and explainer styles", "Sound-synced motion"] },
      { title: "Effects & shot work", topics: ["2D and 3D element integration", "Particles and simulation awareness", "Set extension concepts", "Sky replacement and screen inserts", "Shot breakdown and planning"] },
      { title: "Production workflow", topics: ["Working with plates and footage", "Versioning and review discipline", "Collaborating across departments", "Speed, quality, and deadlines", "Common studio pipelines"] },
      { title: "Showreel development", topics: ["Selecting and refining shots", "Before-and-after breakdowns", "Feedback and iteration", "Reel editing and presentation", "Preparing for studio applications"] },
    ],
    questions: [["What is the difference between VFX and animation?", "Animation creates movement and performances; VFX often integrates created or altered elements into filmed or designed shots."], ["Can I compare both fields first?", "Yes. A consultation can help you compare the kind of daily work and portfolio each path involves."]],
    image: motionProject,
  },
  {
    slug: "ui-ux-web-design",
    number: "04",
    title: "UI/UX & Web Design",
    short: "Research, prototype, and design useful digital experiences for real audiences.",
    direction: "UI designer · UX designer",
    intro: "Move from understanding users and information to creating clear interfaces, prototypes, and reasoned design decisions.",
    practice: ["User and competitor research", "Information architecture", "Wireframes and interface design", "Prototypes and case-study storytelling"],
    outcomes: ["A user-centred design process", "Responsive interface projects", "Case studies that explain decisions"],
    tools: ["Figma", "FigJam", "Adobe XD (awareness)", "Miro (research)", "Basic HTML/CSS awareness"],
    roles: ["UI designer", "UX designer", "Product designer (with experience)", "Web designer", "Interaction designer", "UX researcher (further specialisation)"],
    curriculum: [
      { title: "UX foundations", topics: ["What UX is and how products succeed", "User research and interviews", "Competitor and heuristic analysis", "User personas and journey mapping", "Information architecture"] },
      { title: "Research to structure", topics: ["Problem framing and design briefs", "Card sorting and site maps", "User flows and task analysis", "Content strategy basics", "Prioritising features"] },
      { title: "Interface design", topics: ["Wireframing: low to high fidelity", "Visual design for interfaces", "Typography, colour, and spacing in UI", "Design systems and components", "Responsive and mobile-first layouts"] },
      { title: "Prototyping & testing", topics: ["Interactive prototypes in Figma", "Micro-interactions and states", "Usability testing basics", "Iterating on feedback", "Accessibility fundamentals"] },
      { title: "Web design practice", topics: ["Landing pages and marketing sites", "Designing for conversion", "Handoff: specs and developer collaboration", "HTML/CSS awareness for designers", "Designing within real constraints"] },
      { title: "Portfolio & case studies", topics: ["Documenting process and decisions", "Writing UX case studies", "Presenting work to stakeholders", "Building an online portfolio", "Interview and freelance readiness"] },
    ],
    questions: [["Do I need coding experience?", "No coding experience is needed to begin understanding UI and UX design. Web implementation can be explored separately."], ["What makes a strong UX portfolio?", "Clear problems, thoughtful process, reasoned decisions, and well-presented outcomes matter more than decoration alone."]],
    image: brandProject,
  },
  {
    slug: "video-motion",
    number: "05",
    title: "Video & Motion",
    short: "Shape stories through editing, motion graphics, sound, and visual rhythm.",
    direction: "Video editor · Motion designer",
    intro: "Learn how timing, sequence, typography, imagery, and sound can turn raw material into a clear visual story.",
    practice: ["Editing and visual rhythm", "Motion typography", "Composition and transitions", "Sound-led storytelling"],
    outcomes: ["A practical editing workflow", "Short motion and narrative pieces", "Selected work for a developing reel"],
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Audition (basics)", "DaVinci Resolve (awareness)", "Adobe Photoshop"],
    roles: ["Video editor", "Motion graphics designer", "Social media video editor", "Title sequence designer", "Content creator", "Colour grading assistant (further specialisation)"],
    curriculum: [
      { title: "Editing foundations", topics: ["Story structure and pacing", "Cutting, continuity, and rhythm", "Organising footage and media workflow", "Sound and music in editing", "Export formats and delivery"] },
      { title: "Narrative editing", topics: ["Interview and documentary editing", "Dialogue and performance cutting", "Montage and emotional pacing", "Music-video and promo styles", "Multi-camera basics"] },
      { title: "Motion design", topics: ["Motion typography", "Shape and graphic animation", "Transitions and visual flow", "Timing, easing, and feel", "Logo and brand animation"] },
      { title: "Production skills", topics: ["Colour correction basics", "Titles and lower thirds", "Formats for web and social platforms", "Working to a brief", "Client feedback and revisions"] },
      { title: "Advanced project work", topics: ["Short narrative project", "Promotional or advertisement edit", "Title sequence project", "Social content series", "Mentor feedback rounds"] },
      { title: "Reel development", topics: ["Selecting strongest work", "Reel structure and pacing", "Feedback and refinement", "Reel editing and presentation", "Freelance and studio readiness"] },
    ],
    questions: [["What can I create while learning?", "Projects can include edits, title sequences, short promotional pieces, and motion-led visual stories."], ["Can motion design complement graphic design?", "Yes. Strong typography, layout, and brand thinking provide an excellent base for motion work."]],
    image: motionProject,
  },
  {
    slug: "game-design-creative-ai",
    number: "06",
    title: "Game Design & Creative AI",
    short: "Explore interactive worlds and emerging tools through strong creative fundamentals.",
    direction: "Game artist · Creative technologist",
    intro: "Explore world-building, interaction, visual development, and emerging creative tools while keeping authorship and fundamentals central.",
    practice: ["Game art and visual development", "Environment and asset thinking", "Interaction and player experience", "Responsible creative AI workflows"],
    outcomes: ["A clearer view of game-creation roles", "Small interactive or visual projects", "A direction for deeper specialisation"],
    tools: ["Blender", "Adobe Photoshop", "Game engine awareness (Unity/Unreal)", "Figma (UI/HUD)", "Creative AI tools (guided, responsible use)"],
    roles: ["Game artist", "Environment artist", "Concept artist (further specialisation)", "Game UI designer", "Level designer (further specialisation)", "Creative technologist"],
    curriculum: [
      { title: "Game art foundations", topics: ["Visual development and concept thinking", "Character and environment art", "Stylisation and visual consistency", "Shape language and silhouettes", "Asset creation workflow"] },
      { title: "3D for games", topics: ["Game-ready modelling", "Low-poly vs high-poly workflows", "Texturing for real-time assets", "Optimization awareness", "Exporting for engines"] },
      { title: "Worlds & interaction", topics: ["Level and environment design thinking", "Player experience and feedback", "Interface and HUD awareness", "Prototyping simple interactions", "Game feel and readability"] },
      { title: "Creative AI workflows", topics: ["Where AI tools fit in a creative pipeline", "Ideation and reference generation", "Iterating with AI assistance", "Keeping authorship and judgement central", "Responsible and ethical use"] },
      { title: "Industry awareness", topics: ["Comparing game-industry roles", "How game teams collaborate", "Art pipelines from concept to engine", "Portfolio expectations by role", "Trends and emerging tools"] },
      { title: "Project & direction", topics: ["Small interactive or visual project", "Documenting process", "Presenting game art professionally", "Planning further specialisation", "Portfolio and next steps"] },
    ],
    questions: [["Is this only for gamers?", "No. Curiosity about interactive experiences, art, storytelling, systems, or technology can all lead into this field."], ["Does AI replace creative fundamentals?", "No. Ideas, judgement, visual literacy, and responsible decision-making remain essential." ]],
    image: characterProject,
  },
];

export const projects = [
  { image: characterProject, title: "Character design", meta: "3D · Modelling · Look development" },
  { image: motionProject, title: "Motion systems", meta: "Motion · Composition · 3D" },
  { image: brandProject, title: "Brand worlds", meta: "Identity · Packaging · Campaign" },
];

export const commonFaqs: [string, string][] = [
  ["Can I start without design or software experience?", "Yes. The right starting point depends on your interests and current experience. The consultation helps you compare suitable foundations before choosing."],
  ["How do I choose between animation, VFX, design, and UI/UX?", "Compare what you enjoy making, how you like to solve problems, and the kind of portfolio you want to build. An advisor can help you map those preferences to relevant paths."],
  ["Will I build a portfolio?", "The approach is project-led, with mentor feedback and support for presenting selected work clearly. The exact projects depend on your programme."],
  ["Where can I get current fees, schedules, and duration?", "These details can change by programme and intake. Request a consultation for the current options relevant to your goals."],
  ["Do you have centres outside Ahmedabad?", "No. We run one physical centre, on C.G. Road in Ahmedabad. Learners from elsewhere join the same curriculum in a live online batch."],
];


export const articles = [
  { slug: "choosing-a-creative-course", title: "How to choose the right creative course", excerpt: "A practical way to compare design, animation, VFX, UI/UX, video, and game-focused learning paths.", date: "2026-10-07" },
  { slug: "building-a-creative-portfolio", title: "What makes a useful creative portfolio?", excerpt: "Why process, decisions, iteration, and clear presentation matter alongside the final image.", date: "2026-10-07" },
  { slug: "animation-vs-vfx", title: "Animation or VFX: which direction fits you?", excerpt: "Understand how the work, thinking, and portfolio expectations differ before choosing a path.", date: "2026-10-07" },
];