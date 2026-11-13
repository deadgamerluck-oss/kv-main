import { createFileRoute } from "@tanstack/react-router";
import { CoursesHub } from "@/components/site/courses";

const title = "18 in 1, 12 in 1, 6 in 1 & Digital Marketing Courses Online & Ahmedabad — Kshitij Vivan";
const description = "Compare Kshitij Vivan's graphic design, video editing, UI-UX and AI courses: modules, duration and fees, with placement support, live online worldwide and at the Ahmedabad headquarters.";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/courses" }, { name: "twitter:card", content: "summary_large_image" }],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesHub,
});
