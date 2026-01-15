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
  Heart
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
    { label: 'Centre d\'aide', href: '/help' },
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
  { icon: Facebook, href: 'https://facebook.com/helpdigischool', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/helpdigischool', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/helpdigischool', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@helpdigischool', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A] text-white overflow-hidden pb-20 lg:pb-0">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2302B3]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#4318FF]/10 rounded-full blur-3xl" />
      </div>

      {/* Main footer content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shadow-lg shadow-[#2302B3]/30 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl block">Help Digi School</span>
                <span className="text-sm text-slate-400">
                  Écoles du Cameroun
                </span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-xs leading-relaxed">
              La plateforme tout-en-un pour la gestion moderne des écoles primaires.
              Notes, bulletins, paiements, communication.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:contact@helpdigischool.cm" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#2302B3]/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">contact@helpdigischool.cm</span>
              </a>
              <a href="tel:+237600000000" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#2302B3]/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+237 6 00 00 00 00</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">Douala, Akwa Business Center</span>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produit</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>© {new Date().getFullYear()} Help Digi School.</span>
              <span className="hidden sm:inline">Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 hidden sm:inline" />
              <span className="hidden sm:inline">au Cameroun</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#2302B3] transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
