'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  PenTool,
  Calculator,
  Globe,
  Lightbulb,
  Star,
} from 'lucide-react'

/**
 * SVG path for the Help Digi School "H" hexagon logo.
 * Used as filigrane / watermark pattern across the footer.
 */
const HDS_LOGO_PATH =
  'M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z M35 30 L35 70 M35 50 L65 50 M65 30 L65 70'

const footerLinks = [
  {
    title: 'Produit',
    items: [
      { label: 'Fonctionnalités', href: '/features' },
      { label: 'Tarifs', href: '/pricing' },
      { label: 'Témoignages', href: '/#testimonials' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Entreprise',
    items: [
      { label: 'À propos', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Carrières', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: "Centre d'aide", href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Statut système', href: '/status' },
    ],
  },
  {
    title: 'Légal',
    items: [
      { label: 'Confidentialité', href: '/privacy' },
      { label: 'CGU', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/helpdigischool', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/helpdigischool', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/helpdigischool', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@helpdigischool', label: 'YouTube' },
]

/* Floating education icons for the branded pattern */
const brandIcons = [
  { icon: GraduationCap, x: '8%', y: '12%', size: 20, delay: 0, rotate: -12 },
  { icon: BookOpen, x: '22%', y: '65%', size: 18, delay: 1.2, rotate: 8 },
  { icon: PenTool, x: '38%', y: '25%', size: 16, delay: 0.6, rotate: -20 },
  { icon: Calculator, x: '52%', y: '72%', size: 17, delay: 1.8, rotate: 15 },
  { icon: Globe, x: '68%', y: '18%', size: 19, delay: 0.3, rotate: -8 },
  { icon: Lightbulb, x: '82%', y: '55%', size: 16, delay: 1.5, rotate: 22 },
  { icon: Star, x: '15%', y: '40%', size: 14, delay: 2.1, rotate: -15 },
  { icon: GraduationCap, x: '75%', y: '38%', size: 15, delay: 0.9, rotate: 10 },
  { icon: BookOpen, x: '48%', y: '45%', size: 14, delay: 2.4, rotate: -5 },
  { icon: PenTool, x: '90%', y: '30%', size: 16, delay: 1.1, rotate: 18 },
  { icon: Star, x: '60%', y: '80%', size: 13, delay: 0.7, rotate: -25 },
  { icon: Lightbulb, x: '30%', y: '85%', size: 15, delay: 1.6, rotate: 12 },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pb-20 lg:pb-0">
      {/* ── Deep branded background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080025] via-[#0a0030] to-[#050015]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(99,60,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_90%,rgba(99,60,255,0.06),transparent_50%)]" />

      {/* ── Floating education icons pattern ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {brandIcons.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: item.x, top: item.y, rotate: `${item.rotate}deg` }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.04, 0.08, 0.04],
              }}
              transition={{
                duration: 6 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay,
              }}
            >
              <Icon
                className="text-violet-400"
                style={{ width: item.size, height: item.size }}
                strokeWidth={1.2}
              />
            </motion.div>
          )
        })}
      </div>

      {/* ── Graduation cap + "Help Digi School" text repeated across footer ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hds-brand"
              x="0"
              y="0"
              width="280"
              height="120"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-12)"
            >
              {/* Graduation cap icon */}
              <path d="M24 12 L12 18 L24 24 L36 18 Z" fill="rgba(255,255,255,0.18)" />
              <path
                d="M16 20 L16 26 C16 28 20 30 24 30 C28 30 32 28 32 26 L32 20"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
              />
              <line
                x1="36"
                y1="18"
                x2="36"
                y2="28"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
              />
              {/* Text */}
              <text
                x="44"
                y="24"
                fill="rgba(255,255,255,0.15)"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                letterSpacing="1"
              >
                Help Digi School
              </text>
            </pattern>
            <pattern
              id="hds-brand-2"
              x="140"
              y="60"
              width="280"
              height="120"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-12)"
            >
              <path d="M24 12 L12 18 L24 24 L36 18 Z" fill="rgba(255,255,255,0.14)" />
              <path
                d="M16 20 L16 26 C16 28 20 30 24 30 C28 30 32 28 32 26 L32 20"
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
              />
              <line
                x1="36"
                y1="18"
                x2="36"
                y2="28"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
              />
              <text
                x="44"
                y="24"
                fill="rgba(255,255,255,0.11)"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                letterSpacing="1"
              >
                Help Digi School
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hds-brand)" />
          <rect width="100%" height="100%" fill="url(#hds-brand-2)" />
        </svg>
      </div>

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />

      <div className="container relative z-10 mx-auto px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        {/* ═══════ CTA Banner ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 grid overflow-hidden rounded-2xl border border-violet-500/10 lg:grid-cols-2 lg:rounded-3xl"
        >
          {/* Left: content */}
          <div className="relative z-10 flex flex-col justify-center bg-gradient-to-br from-[#0f0340] via-[#0c0235] to-[#08012a] px-6 py-10 sm:px-10 sm:py-12 lg:py-16 lg:pl-12 lg:pr-8">
            {/* Mini branded pattern in CTA bg */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
              {[GraduationCap, BookOpen, Star, Lightbulb].map((Icon, i) => (
                <Icon
                  key={i}
                  className="absolute text-violet-300"
                  style={{
                    width: 40 + i * 8,
                    height: 40 + i * 8,
                    left: `${10 + i * 25}%`,
                    top: `${15 + ((i * 30) % 70)}%`,
                    rotate: `${-15 + i * 12}deg`,
                  }}
                  strokeWidth={0.8}
                />
              ))}
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-1">
                <GraduationCap className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300/80">
                  Help Digi School
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-extrabold leading-snug text-white sm:text-3xl lg:text-[2rem]">
                L&apos;avenir de l&apos;éducation{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  commence ici.
                </span>
              </h3>
              <p className="mb-7 max-w-md text-sm leading-relaxed text-violet-200/45">
                Rejoignez les écoles primaires qui modernisent la gestion scolaire au Cameroun.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
                >
                  Commencer gratuitement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-400/15 bg-violet-500/5 px-6 py-3 text-sm font-semibold text-violet-200 transition-colors hover:border-violet-400/30 hover:text-white"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          </div>

          {/* Right: child image — visible and prominent */}
          <div className="relative h-64 sm:h-72 lg:h-auto">
            <Image
              src="/student_girl.jpeg"
              alt="Élève souriante camerounaise utilisant Help Digi School"
              fill
              className="object-cover object-top"
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Soft left blend into content on desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0235]/80 via-transparent to-transparent lg:from-[#0c0235]/50 lg:via-transparent" />
            {/* Bottom blend on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08012a]/40 to-transparent" />
            {/* Top subtle violet tint */}
            <div className="absolute inset-0 bg-violet-950/10" />
          </div>
        </motion.div>

        {/* ═══════ Links grid ═══════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
        >
          {/* Brand column */}
          <motion.div variants={fadeIn} custom={0} className="col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-5 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/25">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Help Digi School
              </span>
            </Link>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-violet-300/55">
              La plateforme tout-en-un pour la gestion moderne des écoles primaires au Cameroun.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:contact@helpdigischool.cm"
                className="flex items-center gap-2.5 text-[15px] text-violet-300/55 transition-colors hover:text-violet-200"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <Mail className="h-4 w-4 text-violet-400/70" />
                </div>
                contact@helpdigischool.cm
              </a>
              <a
                href="tel:+237600000000"
                className="flex items-center gap-2.5 text-[15px] text-violet-300/55 transition-colors hover:text-violet-200"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <Phone className="h-4 w-4 text-violet-400/70" />
                </div>
                +237 6 00 00 00 00
              </a>
              <div className="flex items-center gap-2.5 text-[15px] text-violet-300/55">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <MapPin className="h-4 w-4 text-violet-400/70" />
                </div>
                Douala, Cameroun
              </div>
            </div>

            {/* Social icons on mobile - under brand column */}
            <div className="mt-6 flex items-center gap-3 lg:hidden">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300/70 shadow-sm transition-all hover:border-violet-400/30 hover:bg-violet-500/20 hover:text-white hover:shadow-lg hover:shadow-violet-500/10"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((section, i) => (
            <motion.div key={section.title} variants={fadeIn} custom={i + 1}>
              <h4 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-violet-200/60">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[15px] text-violet-300/55 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Branded tagline strip ── */}
        <div className="mt-14 flex items-center gap-3 sm:gap-4 lg:mt-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
          <div className="bg-violet-500/8 flex items-center gap-2.5 rounded-full border border-violet-500/15 px-5 py-2">
            <svg width="18" height="18" viewBox="0 0 100 100" className="text-violet-400/60">
              <path d={HDS_LOGO_PATH} fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400/40 sm:text-[11px]">
              Help Digi School
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-5 py-8 sm:flex-row sm:justify-between sm:py-10"
        >
          <p className="flex items-center gap-1.5 text-[15px] text-violet-400/45">
            &copy; {new Date().getFullYear()} Help Digi School &middot; Fait avec
            <Heart className="h-3.5 w-3.5 fill-rose-500/80 text-rose-500/80" />
            au Cameroun
          </p>

          {/* Social icons desktop only (mobile ones are in brand column) */}
          <div className="hidden items-center gap-3 lg:flex">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/10 text-violet-300/70 shadow-sm transition-all hover:border-violet-400/30 hover:bg-violet-500/20 hover:text-white hover:shadow-lg hover:shadow-violet-500/10"
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
