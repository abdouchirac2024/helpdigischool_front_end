import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { MobileNav } from '@/components/layout/MobileNav'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Help Digi School - Plateforme de Gestion Scolaire',
  description: 'Gérez votre école primaire camerounaise en toute simplicité avec Help Digi School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          {children}
          <MobileNav />
        </Providers>
      </body>
    </html >
  )
}
