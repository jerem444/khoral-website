import Navbar from '@/components/Navbar';

interface Concert {
  date: string;
  lieu: string;
  ville: string;
  description?: string;
}

export default function Concerts() {
  // Exemple de données de concerts
  const concerts: Concert[] = [
    {
      date: "2024-04-15",
      lieu: "Salle de Concert",
      ville: "Paris",
      description: "Concert de lancement"
    },
    // Ajouter plus de concerts ici
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Concerts</h1>
        <div className="max-w-3xl mx-auto">
          {concerts.map((concert, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">{concert.lieu}</h2>
                <span className="text-gray-600">{concert.date}</span>
              </div>
              <p className="text-xl text-gray-700">{concert.ville}</p>
              {concert.description && (
                <p className="mt-2 text-gray-600">{concert.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 