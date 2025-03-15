import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-display font-bold hover:text-primary transition-colors duration-300">
          Khoral
        </Link>
        <div className="space-x-6">
          <Link href="/" className="nav-link">
            Accueil
          </Link>
          <Link href="/portfolio" className="nav-link">
            Portfolio
          </Link>
          <Link href="/concerts" className="nav-link">
            Concerts
          </Link>
          <Link href="/videos" className="nav-link">
            Vidéos
          </Link>
          <Link href="/musique" className="nav-link">
            Musique
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 