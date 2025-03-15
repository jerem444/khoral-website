import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-display font-bold text-center mb-8 animate-fade-in">
          Khoral
        </h1>
        <p className="text-xl text-center mb-12 animate-fade-in">
          Découvrez notre musique
        </p>
        <div className="flex justify-center gap-4 mb-16">
          <a href="/musique" className="btn-secondary animate-fade-in">
            Écouter
          </a>
          <button className="btn-secondary animate-fade-in">
            Concerts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Prochain Concert</h2>
            <p className="text-gray-300">Date à venir</p>
          </div>
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Dernier Album</h2>
            <p className="text-gray-300">All the Lost Weekends</p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="section-title">Nos Dernières Vidéos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder pour les vidéos */}
            <div className="card animate-fade-in">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Titre de la vidéo</h3>
              <p className="text-gray-300">Description de la vidéo</p>
            </div>
            <div className="card animate-fade-in">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Titre de la vidéo</h3>
              <p className="text-gray-300">Description de la vidéo</p>
            </div>
            <div className="card animate-fade-in">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Titre de la vidéo</h3>
              <p className="text-gray-300">Description de la vidéo</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
} 