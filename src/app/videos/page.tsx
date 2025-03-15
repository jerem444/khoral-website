import Navbar from '@/components/Navbar';

interface Video {
  id: string;
  title: string;
  description: string;
}

export default function Videos() {
  // Exemple de données de vidéos
  const videos: Video[] = [
    {
      id: "VIDEO_ID_1", // Remplacer par l'ID de la vidéo YouTube
      title: "Titre de la vidéo 1",
      description: "Description de la vidéo 1"
    },
    {
      id: "VIDEO_ID_2", // Remplacer par l'ID de la vidéo YouTube
      title: "Titre de la vidéo 2",
      description: "Description de la vidéo 2"
    },
    // Ajouter plus de vidéos ici
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Vidéos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h2 className="text-xl font-bold mb-2">{video.title}</h2>
              <p className="text-gray-600">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 