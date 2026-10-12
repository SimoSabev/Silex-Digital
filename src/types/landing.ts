// Legacy landing-page shapes. Not imported anywhere at the moment; prices
// and plans now live in "@/lib/offer". Testimonial and "popular" badge types
// were removed with the testimonials (no verifiable reviews yet).
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Will be used for LucideIcon or icon libraries
  gradient: string; // Tailwind gradient classes
}

export interface Problem {
  icon: string; // Lucide icon name or component
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  accent: "red" | "amber" | "purple";
}

export interface SolutionPoint {
  icon: string;
  title: string;
  description: string;
  accent: "purple" | "violet" | "pink";
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  variant: "primary" | "secondary";
  gradient: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  accent: "purple" | "violet" | "pink";
}
