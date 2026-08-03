import type { SelectHTMLAttributes } from "react";
import { forwardRef, useId } from "react";

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      className = "",
      id,
      options,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    const baseStyles =
      "w-full rounded-[var(--radius-sm)] border-[1.5px] bg-[var(--bg-card)] text-[var(--text-main)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/15 disabled:cursor-not-allowed disabled:opacity-50";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg",
    };

    const errorStyles = error
      ? "border-[var(--accent)]/50 focus-visible:ring-[var(--accent)]/30"
      : "border-[var(--border)]";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--text-sub)]"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`${baseStyles} ${sizeStyles[size]} ${errorStyles} ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
                ? `${selectId}-helper`
                : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[var(--bg-card)] text-[var(--text-muted)]">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[var(--bg-card)] text-[var(--text-main)]"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="text-sm font-medium text-[var(--accent)]">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="text-sm text-[var(--text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
