import { createFileRoute } from "@tanstack/react-router";
import { CurriculumPage } from "@/components/site/curriculum";

export const Route = createFileRoute("/curriculum")({
  head: () => ({
    meta: [
      { title: "Course Curriculum: Design, Animation, VFX & UI/UX — Kshitij Vivan" },
      { name: "description", content: "See every Kshitij Vivan course module by module, from Foundation to Portfolio & Career, and compare courses side by side." },
      { property: "og:title", content: "Course Curriculum — Kshitij Vivan" },
      { property: "og:description", content: "Four-stage curriculum paths and a side-by-side course comparison." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/curriculum" }],
  }),
  component: CurriculumPage,
});
