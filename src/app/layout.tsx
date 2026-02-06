import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from '@/components/providers'
import { MobileNav } from '@/components/layout/MobileNav'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { PWARegister } from '@/components/pwa/PWARegister'
import { OfflineBanner } from '@/components/pwa/OfflineBanner'

// Font Poppins locale (évite les problèmes de réseau avec Google Fonts)
const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/poppins-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/poppins-800.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Help Digi School - Plateforme de Gestion Scolaire',
  description: 'Gerez votre ecole primaire camerounaise en toute simplicite avec Help Digi School',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Help Digi School',
    startupImage: '/icons/icon-512x512.png',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
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
