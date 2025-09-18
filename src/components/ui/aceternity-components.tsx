'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({ title, children, isOpen = false, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-800">
      <motion.button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left hover:text-blue-400 transition-colors"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-lg font-semibold text-white">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </motion.div>
      </motion.button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-gray-300 leading-relaxed">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

interface PricingTierProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onSelect?: () => void;
}

export function PricingTier({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  isPopular = false, 
  ctaText,
  onSelect 
}: PricingTierProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative bg-gray-900/50 border rounded-2xl p-8 backdrop-blur-sm ${
        isPopular 
          ? 'border-blue-500 shadow-2xl shadow-blue-500/25' 
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </motion.div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-gray-400 mt-2">{description}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400">/{period}</span>
        </div>

        <motion.button
          onClick={onSelect}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            isPopular
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'border-2 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400'
          }`}
        >
          {ctaText}
        </motion.button>

        <div className="space-y-3 pt-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface CompanyLogoProps {
  logos: { name: string; src: string; href?: string }[];
  title?: string;
}

export function CompanyLogos({ logos, title }: CompanyLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {title && (
        <h3 className="text-center text-gray-400 font-medium">{title}</h3>
      )}
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="initial"
        animate="animate"
      >
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            variants={{
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="flex items-center justify-center"
          >
            {logo.href ? (
              <a 
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="h-12 w-auto object-contain filter brightness-0 invert"
                />
              </a>
            ) : (
              <img 
                src={logo.src} 
                alt={logo.name}
                className="h-12 w-auto object-contain filter brightness-0 invert opacity-60"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
}

export function TestimonialCard({ quote, author, role, company, avatar, companyLogo }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-gray-700 transition-all"
    >
      <div className="space-y-6">
        <p className="text-gray-300 text-lg leading-relaxed italic">
          "{quote}"
        </p>
        
        <div className="flex items-center gap-4">
          {avatar && (
            <img 
              src={avatar} 
              alt={author}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <p className="font-semibold text-white">{author}</p>
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
          {companyLogo && (
            <img 
              src={companyLogo} 
              alt={company}
              className="h-8 w-auto object-contain opacity-60"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface FeatureGridProps {
  features: {
    icon: ReactNode;
    title: string;
    description: string;
  }[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="initial"
      animate="animate"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700 transition-all group"
        >
          <div className="space-y-4">
            <motion.div 
              className="text-blue-400 group-hover:text-blue-300 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ScrollProgress() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform-gpu z-50"
      style={{ scaleX: 0, transformOrigin: "0%" }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}
