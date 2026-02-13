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
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#2302B3',
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
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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
    'msapplication-TileColor': '#2302B3',
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
