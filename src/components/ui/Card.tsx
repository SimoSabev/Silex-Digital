import { type HTMLAttributes, forwardRef } from "react";

type CardVariant = "default" | "interactive" | "featured" | "glass";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, variant = "default", padding = "md", className = "", ...props },
    ref,
  ) => {
    const variantStyles: Record<CardVariant, string> = {
      default: "card",
      featured: "card-featured",
      interactive: "card-featured",
      glass: "glass",
    };

    const paddingStyles: Record<string, string> = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={` ${variantStyles[variant]} ${paddingStyles[padding]} ${className} `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

// Card sub-components
const CardHeader = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text-main)] ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`mt-1 text-sm text-[var(--text-sub)] ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`mt-4 flex items-center gap-3 ${className}`} {...props}>
    {children}
  </div>
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
export type { CardProps, CardVariant };
