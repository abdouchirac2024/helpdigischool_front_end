'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

// --- ScrollReveal ---
interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
  scale?: boolean
}

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffsets[direction],
        ...(scale ? { scale: 0.95 } : {}),
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}) } : undefined}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- StaggerContainer + StaggerItem ---
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  scale?: boolean
}

const itemVariants = (direction: string, scale: boolean): Variants => ({
  hidden: {
    opacity: 0,
    ...directionOffsets[direction as keyof typeof directionOffsets],
    ...(scale ? { scale: 0.9 } : {}),
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale ? { scale: 1 } : {}),
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

export function StaggerItem({
  children,
  className,
  direction = 'up',
  scale = false,
}: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants(direction, scale)} className={className}>
      {children}
    </motion.div>
  )
}
