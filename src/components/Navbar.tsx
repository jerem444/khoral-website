'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'accueil' },
  { href: '/portfolio', label: 'portfolio' },
  { href: '/concerts', label: 'concerts' },
  { href: '/videos', label: 'vidéos' },
  { href: '/musique', label: 'musique' },
];

const NavLink = ({ href, children, onClick, isMobile = false }: { 
  href: string; 
  children: React.ReactNode; 
  onClick?: () => void;
  isMobile?: boolean;
}) => (
  <Link 
    href={href} 
    className={isMobile ? styles.mobileNavLink : styles.navLink} 
    onClick={onClick}
  >
    {children}
  </Link>
);

const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`${styles.burger} ${isOpen ? styles.menuOpen : ''}`}
    aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
  >
    <div className={`${styles.burgerLine} ${styles.top} mb-1.5`} />
    <div className={`${styles.burgerLine} ${styles.middle} mb-1.5`} />
    <div className={`${styles.burgerLine} ${styles.bottom}`} />
  </button>
);

const DesktopMenu = () => (
  <div className={styles.menuDesktop}>
    {navLinks.map(({ href, label }) => (
      <NavLink key={href} href={href}>
        {label}
      </NavLink>
    ))}
  </div>
);

const MobileMenu = ({ isOpen, onLinkClick }: { isOpen: boolean; onLinkClick: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.menuMobileWrapper}>
      <div className={styles.menuMobile}>
        <nav className={styles.menuMobileNav}>
          {navLinks.map(({ href, label }) => (
            <NavLink 
              key={href} 
              href={href} 
              onClick={onLinkClick}
              isMobile
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBackground} />
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          khoral
        </Link>
        
        <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        <DesktopMenu />
        <MobileMenu isOpen={isMenuOpen} onLinkClick={closeMenu} />
      </div>
    </nav>
  );
};

export default Navbar; 