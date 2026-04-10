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
  popular: boolean;
  features: string[];
  cta: string;
  variant: "primary" | "secondary";
  gradient: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  accent: "purple" | "violet" | "pink";
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  accent: "purple" | "violet" | "pink";
}
