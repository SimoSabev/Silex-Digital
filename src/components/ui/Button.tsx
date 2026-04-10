"use client";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "success"
  | "accent";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    // Base styles not covered by CSS classes
    const base =
      "relative overflow-hidden tracking-[-0.01em] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const variants: Record<ButtonVariant, string> = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-secondary",
      ghost: "btn-ghost",
      success:
        "btn-primary !bg-[var(--lime)] hover:!bg-[var(--lime)] hover:!shadow-[0_0_40px_rgba(101,163,13,0.2)]", // Overlaying primary with lime
      accent:
        "btn-primary !bg-gradient-to-r !from-[var(--coral)] !to-[var(--color-accent-amber)] hover:!shadow-[0_0_40px_rgba(245,158,11,0.2)]",
    };

    const sizes: Record<string, string> = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    };

    const isDisabled = disabled ?? isLoading;

    return (
      <motion.button
        ref={ref}
        type={type}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={isDisabled}
        whileHover={undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        {...props}
      >
        {/* Shimmer overlay */}
        <span className="absolute inset-0 overflow-hidden rounded-[12px]">
          <span className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </span>
        {isLoading && (
          <svg
            className="mr-2 -ml-1 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export default Button;
