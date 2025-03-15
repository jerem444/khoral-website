import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Les images seront ajoutées ici */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4">
              {/* Placeholder pour les images */}
            </div>
            <p className="text-center text-gray-600">Description de la photo</p>
          </div>
          {/* Répéter pour plus d'images */}
        </div>
      </div>
    </main>
  );
} 