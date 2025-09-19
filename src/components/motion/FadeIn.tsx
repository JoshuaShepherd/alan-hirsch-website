"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";

export interface FadeInProps extends MotionProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

/**
 * FadeIn - Contemporary fade animation component
 * 
 * Provides smooth fade-in animations with full respect for 
 * prefers-reduced-motion. Integrates seamlessly with the
 * Editorial Modern design system.
 * 
 * @example
 * ```tsx
 * <FadeIn delay={0.2}>
 *   <h2>This content fades in</h2>
 * </FadeIn>
 * ```
 */
export function FadeIn({ 
  delay = 0, 
  duration = 0.3,
  children,
  ...props 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay,
        duration,
        ease: [0.2, 0.8, 0.2, 1], // Brand easing curve
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}