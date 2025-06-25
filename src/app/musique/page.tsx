import Navbar from '@/components/Navbar';
import BandcampPlayer from '@/components/BandcampPlayer';

export default function MusiquePage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <section className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 animate-fade-in">
            dernier album : all the lost weekends
          </h2>
          <BandcampPlayer />
          <div className="text-center mt-4">
            <a
              href="https://khoral.bandcamp.com/album/all-the-lost-weekends"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Écouter sur Bandcamp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">albums</h2>
            <ul className="space-y-2">
              <li className="album-link">all the lost weekends (2024)</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
} 