"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";

export interface ScaleInProps extends MotionProps {
  delay?: number;
  children: React.ReactNode;
}

/**
 * ScaleIn - Contemporary scale animation component
 * 
 * Provides smooth scale-in animations for interactive elements.
 * Perfect for cards, buttons, and modal content.
 * 
 * @example
 * ```tsx
 * <ScaleIn delay={0.1}>
 *   <Card>Content that scales in</Card>
 * </ScaleIn>
 * ```
 */
export function ScaleIn({ 
  delay = 0,
  children,
  ...props 
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        delay,
        duration: 0.2,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface InteractiveProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Interactive - Contemporary hover/tap animations
 * 
 * Adds subtle hover lift and tap shrink animations to any element.
 * Uses Editorial Modern timing and respects reduced motion preferences.
 * 
 * @example
 * ```tsx
 * <Interactive>
 *   <button>Interactive button</button>
 * </Interactive>
 * ```
 */
export function Interactive({ 
  children,
  className = "",
  ...props 
}: InteractiveProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}