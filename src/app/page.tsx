import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { client } from "../../tina/__generated__/client";
import { Concert } from "@/app/concerts/page";

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
      <section className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-center mb-6 md:mb-8 animate-fade-in">
          khoral
        </h1>
        <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-16">
          <Link href="/musique" className="btn-secondary text-sm md:text-base animate-fade-in">
            Écouter
          </Link>
          <Link href="/concerts" className="btn-secondary text-sm md:text-base animate-fade-in">
            Concerts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          <div className="card animate-fade-in p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Prochain Concert</h2>
            {nextConcert ? (
              <div className="space-y-1 md:space-y-2">
                <p className="text-lg md:text-xl font-bold">{nextConcert.venue}</p>
                <p className="text-base md:text-lg">{nextConcert.city}</p>
                <p className="text-primary text-sm md:text-base">
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
                    className="inline-block mt-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors text-sm"
                  >
                    Réserver
                  </a>
                )}
              </div>
            ) : (
              <p className="text-gray-300 text-sm md:text-base">Aucun concert programmé pour le moment</p>
            )}
          </div>
          <div className="card animate-fade-in p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Dernier Album</h2>
            <p className="text-gray-300 text-sm md:text-base">All the Lost Weekends</p>
          </div>
        </div>

        <section className="mb-8 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl mb-6 md:mb-8">Nos Dernières Vidéos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Placeholder pour les vidéos */}
            <div className="card animate-fade-in p-3 md:p-4">
              <div className="aspect-video bg-gray-800 rounded-lg mb-3 md:mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Titre de la vidéo</h3>
              <p className="text-gray-300 text-sm md:text-base">Description de la vidéo</p>
            </div>
            <div className="card animate-fade-in p-3 md:p-4">
              <div className="aspect-video bg-gray-800 rounded-lg mb-3 md:mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Titre de la vidéo</h3>
              <p className="text-gray-300 text-sm md:text-base">Description de la vidéo</p>
            </div>
            <div className="card animate-fade-in p-3 md:p-4">
              <div className="aspect-video bg-gray-800 rounded-lg mb-3 md:mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Titre de la vidéo</h3>
              <p className="text-gray-300 text-sm md:text-base">Description de la vidéo</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
} 