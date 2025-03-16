import { client } from "../../../tina/__generated__/client";
import Navbar from "@/components/Navbar";

export interface Concert {
  venue: string;
  city: string;
  date: string;
  address?: string;
  description?: string;
  ticketUrl?: string;
  price?: number;
}

export default async function ConcertsPage() {
  const response = await client.queries.concertsConnection();
  const concerts = response.data.concertsConnection.edges?.map((edge: any) => edge.node as Concert) || [];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20 p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Concerts</h1>
        <div className="max-w-4xl mx-auto grid gap-4 md:gap-8">
          {concerts.map((concert: Concert, index: number) => (
            <div key={index} className="bg-secondary/10 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{concert.venue}</h2>
                  <p className="text-base md:text-lg mb-1">{concert.city}</p>
                  {concert.address && (
                    <p className="text-xs md:text-sm text-gray-300">{concert.address}</p>
                  )}
                </div>
                <div className="text-left md:text-right">
                  <p className="text-lg md:text-xl font-bold">
                    {new Date(concert.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-base md:text-lg">
                    {new Date(concert.date).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {concert.price && (
                    <p className="mt-1 md:mt-2 text-base md:text-lg font-semibold">{concert.price}€</p>
                  )}
                </div>
              </div>
              
              {concert.description && (
                <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300">{concert.description}</p>
              )}
              
              {concert.ticketUrl && (
                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 bg-primary text-white text-sm md:text-base rounded-full hover:bg-primary/80 transition-colors"
                >
                  Réserver
                </a>
              )}
            </div>
          ))}
          
          {concerts.length === 0 && (
            <p className="text-center text-sm md:text-base text-gray-400">Aucun concert programmé pour le moment.</p>
          )}
        </div>
      </div>
    </main>
  );
} 