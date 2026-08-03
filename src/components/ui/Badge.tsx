import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary: "badge badge-accent",
  secondary: "badge badge-neutral",
  accent: "badge badge-accent",
  success: "badge badge-accent",
  warning: "badge badge-accent",
  error: "badge badge-accent",
  neutral: "badge badge-neutral",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
