'use client'

import { GraduationCap, BookOpen, Pencil, School, Star } from 'lucide-react'

/**
 * Divider variants for between sections.
 * Each divider is a unique SVG shape + floating school icons.
 */

/** Wave divider: Features (gray) → Stats (dark indigo) */
export function DividerWaveDark() {
  return (
    <div className="relative -mb-1 overflow-hidden bg-muted/30">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <GraduationCap
          className="absolute left-[10%] top-[20%] h-6 w-6 animate-bounce text-indigo-300/40 sm:h-8 sm:w-8"
          style={{ animationDuration: '3s', animationDelay: '0s' }}
        />
        <BookOpen
          className="absolute left-[30%] top-[40%] h-5 w-5 animate-bounce text-purple-300/30 sm:h-7 sm:w-7"
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
        <Star
          className="absolute right-[15%] top-[15%] h-4 w-4 animate-bounce text-violet-300/35 sm:h-6 sm:w-6"
          style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}
        />
        <Pencil
          className="absolute right-[35%] top-[50%] h-5 w-5 animate-bounce text-indigo-400/25 sm:h-6 sm:w-6"
          style={{ animationDuration: '4.5s', animationDelay: '2s' }}
        />
        <School
          className="absolute left-[55%] top-[25%] h-5 w-5 animate-bounce text-purple-400/30 sm:h-7 sm:w-7"
          style={{ animationDuration: '3.8s', animationDelay: '1.5s' }}
        />
      </div>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: '80px' }}
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          className="fill-indigo-950"
        />
        <path
          d="M0,80 C360,40 720,100 1080,50 C1260,30 1380,70 1440,80 L1440,120 L0,120 Z"
          className="fill-indigo-950"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

/** Curved divider: Stats (dark indigo) → Testimonials (white) */
export function DividerWaveLight() {
  return (
    <div className="relative -mb-1 overflow-hidden bg-gradient-to-br from-indigo-950 via-[#1a1060] to-purple-950">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <GraduationCap
          className="absolute left-[20%] top-[30%] h-7 w-7 animate-bounce text-white/10 sm:h-9 sm:w-9"
          style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}
        />
        <BookOpen
          className="absolute right-[25%] top-[20%] h-6 w-6 animate-bounce text-white/10 sm:h-8 sm:w-8"
          style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}
        />
        <Pencil
          className="text-white/8 absolute left-[50%] top-[50%] h-5 w-5 animate-bounce sm:h-7 sm:w-7"
          style={{ animationDuration: '3.7s', animationDelay: '0.8s' }}
        />
        <Star
          className="absolute right-[10%] top-[40%] h-4 w-4 animate-bounce text-white/10 sm:h-6 sm:w-6"
          style={{ animationDuration: '4s', animationDelay: '2s' }}
        />
        <School
          className="text-white/8 absolute left-[75%] top-[15%] h-6 w-6 animate-bounce sm:h-8 sm:w-8"
          style={{ animationDuration: '3.5s', animationDelay: '1.8s' }}
        />
      </div>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: '80px' }}
      >
        <path
          d="M0,40 C180,100 360,0 540,60 C720,120 900,20 1080,70 C1200,100 1350,30 1440,50 L1440,120 L0,120 Z"
          fill="white"
        />
        <path
          d="M0,70 C200,30 500,100 800,50 C1000,20 1200,80 1440,60 L1440,120 L0,120 Z"
          fill="white"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}

/** Layered wave: Hero → Features (gray) */
export function DividerHeroToFeatures() {
  return (
    <div className="relative -mb-1 overflow-hidden">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <GraduationCap
          className="absolute left-[12%] top-[25%] h-6 w-6 animate-bounce text-violet-500/20 sm:h-8 sm:w-8"
          style={{ animationDuration: '3s', animationDelay: '0s' }}
        />
        <BookOpen
          className="absolute right-[18%] top-[35%] h-5 w-5 animate-bounce text-purple-500/15 sm:h-7 sm:w-7"
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        />
        <School
          className="absolute left-[45%] top-[15%] h-6 w-6 animate-bounce text-indigo-500/20 sm:h-8 sm:w-8"
          style={{ animationDuration: '3.6s', animationDelay: '0.5s' }}
        />
        <Pencil
          className="absolute right-[40%] top-[45%] h-4 w-4 animate-bounce text-violet-400/15 sm:h-6 sm:w-6"
          style={{ animationDuration: '4.3s', animationDelay: '1.5s' }}
        />
      </div>
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: '70px' }}
      >
        <path
          d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z"
          className="fill-muted/30"
          opacity="0.5"
        />
        <path d="M0,70 Q360,30 720,70 T1440,70 L1440,100 L0,100 Z" className="fill-muted/30" />
      </svg>
    </div>
  )
}

/** Zigzag/Mountain divider: Testimonials (white) → FAQ (gray) */
export function DividerTestimonialsToFAQ() {
  return (
    <div className="relative -mb-1 overflow-hidden bg-white">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <GraduationCap
          className="absolute left-[18%] top-[20%] h-6 w-6 animate-bounce text-gray-300/50 sm:h-8 sm:w-8"
          style={{ animationDuration: '3.4s', animationDelay: '0.2s' }}
        />
        <BookOpen
          className="absolute right-[22%] top-[30%] h-5 w-5 animate-bounce text-gray-400/30 sm:h-7 sm:w-7"
          style={{ animationDuration: '3.8s', animationDelay: '1.3s' }}
        />
        <Star
          className="absolute left-[50%] top-[10%] h-4 w-4 animate-bounce text-violet-300/25 sm:h-6 sm:w-6"
          style={{ animationDuration: '4.1s', animationDelay: '0.7s' }}
        />
        <School
          className="absolute right-[40%] top-[45%] h-5 w-5 animate-bounce text-gray-300/35 sm:h-7 sm:w-7"
          style={{ animationDuration: '3.3s', animationDelay: '2.2s' }}
        />
      </div>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path
          d="M0,40 L120,20 L240,50 L360,15 L480,45 L600,10 L720,40 L840,15 L960,50 L1080,20 L1200,45 L1320,10 L1440,35 L1440,80 L0,80 Z"
          className="fill-muted/30"
          opacity="0.4"
        />
        <path
          d="M0,55 C240,30 480,65 720,40 C960,15 1200,55 1440,45 L1440,80 L0,80 Z"
          className="fill-muted/30"
        />
      </svg>
    </div>
  )
}
