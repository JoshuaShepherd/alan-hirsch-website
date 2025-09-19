"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

export interface MotionProviderProps {
  children: React.ReactNode;
  reducedMotion?: "user" | "always" | "never";
}

/**
 * MotionProvider - Contemporary animation configuration
 * 
 * Provides consistent motion configuration across the app with
 * full respect for accessibility preferences. Uses Editorial Modern
 * timing and easing curves.
 * 
 * @example
 * ```tsx
 * <MotionProvider>
 *   <App />
 * </MotionProvider>
 * ```
 */
export function MotionProvider({ 
  children,
  reducedMotion = "user"
}: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion={reducedMotion}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: [0.2, 0.8, 0.2, 1], // Brand easing curve
      }}
    >
      {children}
    </MotionConfig>
  );
}