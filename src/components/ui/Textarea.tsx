import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, size = "md", className = "", id, ...props },
    ref,
  ) => {
    const textareaId =
      id ?? `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      "w-full resize-y rounded-xl border bg-[var(--bg-card)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-all duration-300 focus-visible:border-[var(--violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--violet)]/30 disabled:cursor-not-allowed disabled:opacity-50";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm min-h-[80px]",
      md: "px-4 py-2.5 text-base min-h-[120px]",
      lg: "px-5 py-3 text-lg min-h-[160px]",
    };

    const errorStyles = error
      ? "border-[var(--coral)]/50 focus-visible:ring-[var(--coral)]/30"
      : "border-[var(--border)]";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`${baseStyles} ${sizeStyles[size]} ${errorStyles} ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-red-400">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-sm text-[var(--text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
