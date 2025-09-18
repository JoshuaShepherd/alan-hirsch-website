'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, cardHover, buttonHover } from '@/lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={{ scale: 1.02 }}
      className={`bg-graphite/50 border border-graphite rounded-xl p-6 backdrop-blur-sm transition-all hover:border-stone hover:shadow-xl hover:shadow-indigo/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
}

export function AnimatedButton({ 
  children, 
  className = '', 
  variant = 'primary',
  onClick,
  href 
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-indigo text-paper hover:bg-indigo/80",
    secondary: "border-2 border-indigo text-indigo hover:bg-indigo hover:text-paper",
    ghost: "text-graphite hover:text-paper hover:bg-graphite"
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ children, className = '', delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GradientOrbProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'pink';
  className?: string;
}

export function GradientOrb({ size = 'md', color = 'blue', className = '' }: GradientOrbProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96'
  };

  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    purple: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    pink: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20'
  };

  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full blur-3xl absolute ${className}`}
    />
  );
}

interface StatusIndicatorProps {
  status: 'connected' | 'waiting' | 'error';
  label: string;
  className?: string;
}

export function StatusIndicator({ status, label, className = '' }: StatusIndicatorProps) {
  const statusConfig = {
    connected: {
      color: 'bg-green-500',
      text: 'text-green-400',
      border: 'border-green-500/30'
    },
    waiting: {
      color: 'bg-yellow-500',
      text: 'text-yellow-400', 
      border: 'border-yellow-500/30'
    },
    error: {
      color: 'bg-red-500',
      text: 'text-red-400',
      border: 'border-red-500/30'
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.border} bg-gray-900/50 backdrop-blur-sm ${className}`}
    >
      <motion.div
        animate={status === 'waiting' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className={`w-2 h-2 rounded-full ${config.color}`}
      />
      <span className={`text-sm font-medium ${config.text}`}>{label}</span>
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  className?: string;
}

export function MetricCard({ title, value, change, trend, icon, className = '' }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <AnimatedCard className={className}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <motion.p 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.p>
          {change && (
            <p className={`text-sm ${trend ? trendColors[trend] : 'text-gray-400'}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-400"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </AnimatedCard>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-gray-600 border-t-blue-500 rounded-full ${className}`}
    />
  );
}
