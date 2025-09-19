import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "muted" | "success" | "attention" | "danger";
  size?: "sm" | "md" | "lg";
}

/**
 * Eyebrow - Contemporary label component
 * 
 * Small uppercase labels for section headers, categories, and metadata.
 * Integrates with your Editorial Modern color palette while adding
 * semantic state variants.
 * 
 * @example
 * ```tsx
 * <Eyebrow variant="accent">Featured Article</Eyebrow>
 * <Eyebrow variant="success" size="sm">Published</Eyebrow>
 * ```
 */
export function Eyebrow({ 
  className = "", 
  variant = "default",
  size = "md",
  children,
  ...props 
}: EyebrowProps) {
  const variants = {
    default: "text-muted-foreground",
    accent: "text-primary", // Uses your indigo color
    muted: "text-muted-foreground/70",
    success: "text-success",
    attention: "text-attention", 
    danger: "text-danger",
  };

  const sizes = {
    sm: "text-xs tracking-wider",
    md: "text-sm tracking-wide",
    lg: "text-base tracking-wide",
  };

  return (
    <span
      className={cn(
        // Base styles maintaining Editorial Modern aesthetic
        "inline-block font-medium uppercase",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}