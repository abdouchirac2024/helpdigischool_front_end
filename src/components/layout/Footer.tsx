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
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/helpdigischool',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/helpdigischool',
    label: 'LinkedIn',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@helpdigischool',
    label: 'YouTube',
  },
]

const linkSections = [
  { title: 'Produit', items: links.product },
  { title: 'Entreprise', items: links.company },
  { title: 'Support', items: links.support },
  { title: 'Légal', items: links.legal },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 pb-20 text-white lg:pb-0">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        {/* Top: Brand + Links */}
        <div className="grid gap-10 pb-10 sm:gap-12 sm:pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="group mb-5 inline-flex items-center gap-3 sm:mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                <GraduationCap className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block text-lg font-bold sm:text-xl">Help Digi School</span>
                <span className="text-xs text-slate-500 sm:text-sm">Écoles du Cameroun</span>
              </div>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-400 sm:mb-8 sm:text-base">
              La plateforme tout-en-un pour la gestion moderne des écoles primaires. Notes,
              bulletins, paiements, communication.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 sm:space-y-3">
              <a
                href="mailto:contact@helpdigischool.cm"
                className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-primary/20 sm:h-9 sm:w-9">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">contact@helpdigischool.cm</span>
              </a>
              <a
                href="tel:+237600000000"
                className="group flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-primary/20 sm:h-9 sm:w-9">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm">+237 6 00 00 00 00</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 sm:h-9 sm:w-9">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">Douala, Akwa Business Center</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:gap-6 xl:gap-10">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300 sm:mb-5 sm:text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  {section.items.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08]" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-5 py-6 sm:flex-row sm:py-8">
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-slate-500 sm:justify-start sm:text-sm">
            <span>&copy; {new Date().getFullYear()} Help Digi School.</span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              Fait avec
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              au Cameroun
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 transition-all hover:scale-110 hover:bg-primary sm:h-10 sm:w-10"
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
