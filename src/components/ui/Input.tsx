import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, ReactNode } from "react";
import { JSX, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  hint?: string;
  error?: string;
  labelHidden?: boolean;
}

export default function Input({
  label,
  hint,
  error,
  id,
  labelHidden,
  className = "",
  ...props
}: InputProps): JSX.Element {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={cn(
          "font-body text-caption font-semibold tracking-wider",
          "text-text-primary uppercase",
          labelHidden && "sr-only",
        )}
      >
        {label}
        {props.required && (
          <span className="ml-1 text-text-accent" aria-hidden={true}>
            *
          </span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="text-caption text-text-muted">
          {hint}
        </p>
      )}

      <input
        id={inputId}
        aria-describedby={
          [errorId, hintId].filter(Boolean).join(" ") || undefined
        }
        aria-invalid={error ? "true" : "false"}
        className={cn(
          "w-full rounded-card",
          "border border-border-default",
          "bg-transparent",
          "px-4 py-3",
          "font-body text-body text-text-body",
          "placeholder:text-text-muted",
          "transition-all duration-150",
          "focus:border-border-accent focus:shadow-focus focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500",
          className,
        )}
        {...props}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-caption font-semibold text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
