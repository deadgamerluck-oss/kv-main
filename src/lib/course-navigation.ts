import { courses } from '@/data/courses';

export const courseEnquiryName = (course: (typeof courses)[number]) => `${course.tier.replace(/-/g, ' ')} ${course.title}`;
export function enquiryOptions(specialisations: { title: string }[]) {
  return {
    courses: courses.map(courseEnquiryName),
    specialisations: specialisations.map(p => p.title),
  };
}