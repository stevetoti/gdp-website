'use client'

import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// Fade in up animation
export function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '',
  ...props 
}: { 
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Fade in animation
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '',
  ...props 
}: { 
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Scale in animation
export function ScaleIn({ 
  children, 
  delay = 0,
  className = '',
  ...props 
}: { 
  children: ReactNode
  delay?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide in from left
export function SlideInLeft({ 
  children, 
  delay = 0,
  className = '',
  ...props 
}: { 
  children: ReactNode
  delay?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide in from right
export function SlideInRight({ 
  children, 
  delay = 0,
  className = '',
  ...props 
}: { 
  children: ReactNode
  delay?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation
export function StaggerContainer({ 
  children, 
  delay = 0,
  staggerDelay = 0.1,
  className = '',
  ...props 
}: { 
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ 
  children, 
  className = '',
  ...props 
}: { 
  children: ReactNode
  className?: string
} & HTMLMotionProps<'div'>) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}

// Hover scale effect
export function HoverScale({ 
  children, 
  scale = 1.05,
  className = '',
  ...props 
}: { 
  children: ReactNode
  scale?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Counter animation for stats
export function AnimatedCounter({ 
  value, 
  suffix = '',
  prefix = '',
  duration = 2,
  className = '' 
}: { 
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  )
}

// Floating animation
export function FloatingElement({ 
  children, 
  duration = 3,
  y = 10,
  className = '',
  ...props 
}: { 
  children: ReactNode
  duration?: number
  y?: number
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      animate={{ y: [0, -y, 0] }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Pulse animation
export function PulseElement({ 
  children, 
  className = '',
  ...props 
}: { 
  children: ReactNode
  className?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Gradient blob background
export function GradientBlob({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
