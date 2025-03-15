import Navbar from '@/components/Navbar';
import BandcampPlayer from '@/components/BandcampPlayer';

export default function MusiquePage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-center mb-8 animate-fade-in">
          Notre Musique
        </h1>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 animate-fade-in">
            Dernier Album : All the Lost Weekends
          </h2>
          <BandcampPlayer />
          <div className="text-center mt-4">
            <a 
              href="https://khoral.bandcamp.com/album/all-the-lost-weekends" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Écouter sur Bandcamp →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Albums</h2>
            <ul className="space-y-2">
              <li className="album-link">All the Lost Weekends (2024)</li>
              <li className="album-link">Barren Dreams (2024)</li>
              <li className="album-link">The Days Never End (2017)</li>
              <li className="album-link">Upon a Sleepless Land (2015)</li>
              <li className="album-link">The Crack-Up (2015)</li>
              <li className="album-link">Hungry Ghosts (2014)</li>
              <li className="album-link">Strawberry Blonde (2009)</li>
              <li className="album-link">Uniforms of Snow (2009)</li>
              <li className="album-link">Broken Sails (2009)</li>
            </ul>
          </div>
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Plateformes</h2>
            <div className="space-y-4">
              <a 
                href="https://khoral.bandcamp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white hover:text-gray-300 transition-colors duration-300"
              >
                Bandcamp
              </a>
              <a 
                href="https://open.spotify.com/artist/..." 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white hover:text-gray-300 transition-colors duration-300"
              >
                Spotify
              </a>
              <a 
                href="https://music.apple.com/artist/..." 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white hover:text-gray-300 transition-colors duration-300"
              >
                Apple Music
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 