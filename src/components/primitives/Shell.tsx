import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "bordered";
  size?: "sm" | "md" | "lg";
}

/**
 * Shell - Contemporary card wrapper component
 * 
 * A foundational component for creating consistent card layouts with
 * the Editorial Modern design system. Preserves existing color palette
 * while adding contemporary styling options.
 * 
 * @example
 * ```tsx
 * <Shell variant="elevated" size="md">
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </Shell>
 * ```
 */
export function Shell({ 
  className = "", 
  variant = "default",
  size = "md",
  children,
  ...props 
}: ShellProps) {
  const variants = {
    default: "bg-card border border-border shadow-xs",
    elevated: "bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-base",
    glass: "glass shadow-lg border border-border/20",
    bordered: "bg-card border-2 border-border/40 shadow-none",
  };

  const sizes = {
    sm: "p-4 rounded-xl",
    md: "p-6 rounded-2xl", 
    lg: "p-8 rounded-3xl",
  };

  return (
    <div
      className={cn(
        // Base styles preserving Editorial Modern aesthetic
        "relative transition-all duration-base ease-brand",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}