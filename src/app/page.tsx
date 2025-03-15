import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { client } from "../../tina/__generated__/client";

interface Concert {
  venue: string;
  city: string;
  date: string;
  ticketUrl?: string;
}

async function getNextConcert() {
  const response = await client.queries.concertsConnection();
  const concerts = response.data.concertsConnection.edges?.map((edge: any) => edge.node as Concert) || [];
  
  // Filtrer les concerts futurs et les trier par date
  const futureConcerts = concerts
    .filter((concert: Concert) => new Date(concert.date) > new Date())
    .sort((a: Concert, b: Concert) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return futureConcerts[0]; // Retourne le prochain concert ou undefined
}

export default async function Home() {
  const nextConcert = await getNextConcert();

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
          <Link href="/musique" className="btn-secondary animate-fade-in">
            Écouter
          </Link>
          <Link href="/concerts" className="btn-secondary animate-fade-in">
            Concerts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Prochain Concert</h2>
            {nextConcert ? (
              <div className="space-y-2">
                <p className="text-xl font-bold">{nextConcert.venue}</p>
                <p className="text-lg">{nextConcert.city}</p>
                <p className="text-primary">
                  {new Date(nextConcert.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  {' à '}
                  {new Date(nextConcert.date).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                {nextConcert.ticketUrl && (
                  <a
                    href={nextConcert.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors text-sm"
                  >
                    Réserver
                  </a>
                )}
              </div>
            ) : (
              <p className="text-gray-300">Aucun concert programmé pour le moment</p>
            )}
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