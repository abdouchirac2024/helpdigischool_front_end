import Link from 'next/link'
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react'

const regions = [
  'Centre', 'Littoral', 'Ouest', 'Nord-Ouest', 
  'Sud-Ouest', 'Nord', 'Adamaoua', 'Est', 'Sud', 'Extrême-Nord'
]

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
  legal: [
    { label: 'Confidentialité', href: '/privacy' },
    { label: 'CGU', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background pb-20 lg:pb-0">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-xl block">Help Digi School</span>
                <span className="text-sm text-muted-foreground">
                  Écoles Primaires Cameroun
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              La plateforme SaaS #1 pour la gestion des écoles primaires au Cameroun. 
              Notes, bulletins, paiements - tout en un clic.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Produit</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Douala, Cameroun<br />
                  Akwa Business Center
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+237600000000" className="text-muted-foreground hover:text-primary text-sm">
                  +237 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@helpdigischool.cm" className="text-muted-foreground hover:text-primary text-sm">
                  contact@helpdigischool.cm
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/20">
          <h4 className="font-semibold mb-4 text-center">Nous couvrons les 10 régions du Cameroun</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map((region) => (
              <span
                key={region}
                className="px-3 py-1 rounded-full bg-muted/10 text-sm text-muted-foreground"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Help Digi School. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {links.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
