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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HelpDigiSchool" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
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
