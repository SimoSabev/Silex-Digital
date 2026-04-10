import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, size = "md", className = "", id, ...props },
    ref,
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles = "input disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles = {
      sm: "!py-2 !px-3 !text-sm",
      md: "",
      lg: "!py-4 !px-5 !text-lg",
    };

    const errorStyles = error ? "input-error" : "";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text-main)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseStyles} ${sizeStyles[size]} ${errorStyles} ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-[var(--coral)]">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-[var(--text-sub)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
