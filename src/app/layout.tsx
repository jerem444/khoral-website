import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'khoral',
  description: 'Découvrez la musique de khoral',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="fr">
    <body className={inter.className}>
      {children}
    </body>
  </html>
);

export default RootLayout;
