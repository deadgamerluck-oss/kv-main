import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CourseDetail } from "@/components/site/courses";
import { headquarters } from "@/lib/site-seo";
import { findCourse } from "@/data/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = findCourse(params.slug);
    if (!course) throw notFound();
    return { slug: course.slug };
  },
  head: ({ params }) => {
    const c = findCourse(params.slug);
    if (!c) return { meta: [{ title: "Course not found — Kshitij Vivan" }, { name: "robots", content: "noindex" }] };
    const title = `${c.tier.replace(/-/g, " ")} ${c.title} Online & Ahmedabad — Kshitij Vivan`;
    return {
      meta: [{ title }, { name: "description", content: c.tagline }, { property: "og:title", content: title }, { property: "og:description", content: c.tagline }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }],
      links: [{ rel: "canonical", href: `/courses/${c.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: `${c.tier} ${c.title}`, description: c.tagline, provider: headquarters, availableLanguage: "en", courseMode: ["online", "onsite"] }) }],
    };
  },
  notFoundComponent: () => <section className="mx-auto max-w-3xl px-5 py-28 text-center"><h1 className="font-display text-5xl font-semibold">Course not found</h1><Link to="/courses" className="mt-7 inline-block font-bold text-primary">View all courses</Link></section>,
  component: CourseRoute,
});

function CourseRoute() {
  const { slug } = Route.useParams();
  const course = findCourse(slug);
  if (!course) throw notFound();
  return <CourseDetail course={course} />;
}
