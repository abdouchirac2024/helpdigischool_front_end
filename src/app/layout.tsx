import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { MobileNav } from '@/components/layout/MobileNav'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { PWARegister } from '@/components/pwa/PWARegister'
import { OfflineBanner } from '@/components/pwa/OfflineBanner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Help Digi School - Plateforme de Gestion Scolaire',
  description: 'Gerez votre ecole primaire camerounaise en toute simplicite avec Help Digi School',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Help Digi School',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Help Digi School',
    title: 'Help Digi School - Plateforme de Gestion Scolaire',
    description:
      'Gerez votre ecole primaire camerounaise en toute simplicite avec Help Digi School',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#2563eb',
    'msapplication-tap-highlight': 'no',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
      </head>
      <body className={poppins.className}>
        <Providers>
          <OfflineBanner />
          {children}
          <MobileNav />
          <InstallPrompt />
        </Providers>
        <PWARegister />
      </body>
    </html>
  )
}
