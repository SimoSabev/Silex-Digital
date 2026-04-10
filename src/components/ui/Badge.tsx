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
  primary: "badge badge-violet",
  secondary: "badge badge-neutral",
  accent: "badge badge-amber",
  success: "badge badge-lime",
  warning: "badge badge-amber",
  error: "badge badge-coral",
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
