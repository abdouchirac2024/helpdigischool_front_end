'use client'

import Link from 'next/link'
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
  ArrowRight,
  Send,
  BookOpen,
  Shield,
  Headphones,
} from 'lucide-react'

const links = {
  product: [
    { label: 'Fonctionnalités', href: '/features' },
    { label: 'Tarifs', href: '/pricing' },
    { label: 'Témoignages', href: '/#testimonials' },
    { label: 'FAQ', href: '/#faq' },
  ],
  company: [
    { label: 'À propos', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carrières', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: "Centre d'aide", href: '/help' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Statut système', href: '/status' },
  ],
  legal: [
    { label: 'Confidentialité', href: '/privacy' },
    { label: 'CGU', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://facebook.com/helpdigischool',
    label: 'Facebook',
    color: 'hover:bg-[#1877F2]',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/helpdigischool',
    label: 'Twitter',
    color: 'hover:bg-[#1DA1F2]',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/helpdigischool',
    label: 'LinkedIn',
    color: 'hover:bg-[#0A66C2]',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@helpdigischool',
    label: 'YouTube',
    color: 'hover:bg-[#FF0000]',
  },
]

const linkSections = [
  { title: 'Produit', icon: BookOpen, items: links.product },
  { title: 'Entreprise', icon: GraduationCap, items: links.company },
  { title: 'Support', icon: Headphones, items: links.support },
  { title: 'Légal', icon: Shield, items: links.legal },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden pb-20 lg:pb-0">
      {/* ── Gradient Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0333] via-[#110442] to-[#0a0226]" />

      {/* ── Decorative Elements ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top glow */}
        <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#2302B3]/20 blur-[120px]" />
        {/* Side accents */}
        <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[#4318FF]/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-[#2302B3]/10 blur-[100px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Top curved separator */}
        <svg
          className="absolute -top-1 left-0 right-0 w-full text-white"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M0 60V0h1440v60c-240-40-480-55-720-50S240 20 0 60z" fill="currentColor" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        {/* ── Newsletter CTA Band ── */}
        <div className="mb-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#2302B3]/30 via-[#4318FF]/20 to-[#2302B3]/30 p-6 backdrop-blur-sm sm:mb-16 sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="text-center lg:text-left">
              <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
                Restez informé des nouveautés
              </h3>
              <p className="max-w-md text-sm text-slate-300/80 sm:text-base">
                Recevez nos dernières actualités et mises à jour directement dans votre boîte mail.
              </p>
            </div>
            <form
              className="flex w-full max-w-md gap-2 sm:gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-4 text-sm text-white placeholder-slate-400/60 outline-none ring-0 transition-all focus:border-[#4318FF]/50 focus:bg-white/[0.1] sm:h-12 sm:rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#2302B3] to-[#4318FF] px-5 text-sm font-semibold text-white shadow-lg shadow-[#2302B3]/30 transition-all hover:shadow-xl hover:shadow-[#2302B3]/40 active:scale-[0.97] sm:h-12 sm:px-6"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">S&apos;abonner</span>
              </button>
            </form>
          </div>
        </div>

        {/* ── Main Grid: Brand + Link Columns ── */}
        <div className="grid gap-10 pb-12 sm:gap-12 sm:pb-14 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="group mb-6 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-lg shadow-[#2302B3]/30 ring-1 ring-white/10 transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#4318FF]/40 sm:h-14 sm:w-14">
                <GraduationCap className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  Help Digi School
                </span>
                <span className="text-xs font-medium text-[#4318FF]/80 sm:text-sm">
                  Écoles Primaires du Cameroun
                </span>
              </div>
            </Link>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              La plateforme tout-en-un pour la gestion moderne des écoles primaires. Notes,
              bulletins, paiements, communication — tout en un clic.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@helpdigischool.cm"
                className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.06] transition-all group-hover:bg-[#2302B3]/30 group-hover:ring-[#2302B3]/30">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">contact@helpdigischool.cm</span>
              </a>
              <a
                href="tel:+237600000000"
                className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.06] transition-all group-hover:bg-[#2302B3]/30 group-hover:ring-[#2302B3]/30">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm">+237 6 00 00 00 00</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.06]">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">Douala, Akwa Business Center</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:gap-6 xl:gap-10">
            {linkSections.map((section) => {
              const SectionIcon = section.icon
              return (
                <div key={section.title}>
                  <div className="mb-5 flex items-center gap-2">
                    <SectionIcon className="h-4 w-4 text-[#4318FF]/70" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
                      {section.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-1.5 text-sm text-slate-400 transition-all hover:text-white"
                        >
                          <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                          <span className="transition-transform group-hover:translate-x-0.5">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#4318FF]/40 to-transparent" />
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between sm:py-10">
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-slate-500 sm:justify-start sm:text-sm">
            <span>&copy; {new Date().getFullYear()} Help Digi School.</span>
            <span className="inline-flex items-center gap-1">
              Fait avec
              <Heart className="h-3 w-3 animate-pulse fill-red-500 text-red-500" />
              au Cameroun
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08] transition-all hover:scale-110 hover:shadow-lg hover:ring-0 active:scale-95 ${social.color}`}
              >
                <social.icon className="h-[18px] w-[18px] text-slate-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
