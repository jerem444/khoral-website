import { client } from "../../../tina/__generated__/client";
import Navbar from "@/components/Navbar";

interface Concert {
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
      <div className="pt-20 p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Concerts</h1>
        <div className="max-w-4xl mx-auto grid gap-8">
          {concerts.map((concert: Concert, index: number) => (
            <div key={index} className="bg-secondary/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{concert.venue}</h2>
                  <p className="text-lg mb-1">{concert.city}</p>
                  {concert.address && (
                    <p className="text-sm text-gray-300">{concert.address}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    {new Date(concert.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-lg">
                    {new Date(concert.date).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {concert.price && (
                    <p className="mt-2 text-lg font-semibold">{concert.price}€</p>
                  )}
                </div>
              </div>
              
              {concert.description && (
                <p className="mt-4 text-gray-300">{concert.description}</p>
              )}
              
              {concert.ticketUrl && (
                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                >
                  Réserver
                </a>
              )}
            </div>
          ))}
          
          {concerts.length === 0 && (
            <p className="text-center text-gray-400">Aucun concert programmé pour le moment.</p>
          )}
        </div>
      </div>
    </main>
  );
} 