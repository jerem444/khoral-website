import Footer from '@/components/Footer';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'khoral',
  description: 'Découvrez la musique de khoral',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/icons/apple-icon.png' },
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/icon1.png',
        color: '#000000'
      }
    ]
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="fr">
    <head>
      <link rel="manifest" href="/manifest.json" />
    </head>
    <body className={inter.className}>
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
