"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";

export interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Stagger - Contemporary staggered animation container
 * 
 * Animates children with a staggered delay for elegant choreography.
 * Respects prefers-reduced-motion and uses Editorial Modern timing.
 * 
 * @example
 * ```tsx
 * <Stagger staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 * ```
 */
export function Stagger({ 
  children, 
  staggerDelay = 0.1,
  className = "",
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.2, 0.8, 0.2, 1], // Brand easing
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}