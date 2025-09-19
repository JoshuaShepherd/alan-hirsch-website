import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "contemporary" | "compact" | "academic";
  size?: "sm" | "md" | "lg";
}

/**
 * Prose - Enhanced typography wrapper
 * 
 * Provides consistent long-form content styling that integrates with
 * your existing Editorial Modern typography system. Adds contemporary
 * enhancements while preserving the academic sophistication.
 * 
 * @example
 * ```tsx
 * <Prose variant="contemporary" size="lg">
 *   <h2>Article Title</h2>
 *   <p>Long-form content with enhanced typography...</p>
 * </Prose>
 * ```
 */
export function Prose({ 
  className = "", 
  variant = "default",
  size = "md",
  children,
  ...props 
}: ProseProps) {
  const variants = {
    default: "prose max-w-none text-foreground",
    contemporary: "prose-contemporary space-contemporary",
    compact: "prose prose-sm max-w-none text-foreground space-contemporary-sm",
    academic: "prose prose-lg max-w-none text-foreground font-display space-contemporary-lg",
  };

  const sizes = {
    sm: "text-sm leading-relaxed",
    md: "text-base leading-relaxed", 
    lg: "text-lg leading-relaxed",
  };

  return (
    <div
      className={cn(
        // Base styles preserving Editorial Modern typography
        "text-foreground",
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