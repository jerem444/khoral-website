'use client';

import { useEffect, useState } from 'react';
import { ConcertPartsFragment } from '../../../tina/__generated__/types';
import styles from './page.module.css';
import { client } from '@/lib/tina-client';
import ConcertInfo from '@/components/ConcertInfo';
import ImageModal from '@/components/ImageModal';
import Navbar from '@/components/Navbar';

const ConcertsPage = () => {
  const [futureConcerts, setFutureConcerts] = useState<ConcertPartsFragment[]>([]);
  const [pastConcerts, setPastConcerts] = useState<ConcertPartsFragment[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      const [future, past] = await Promise.all([
        client.getFutureConcerts(),
        client.getPastConcerts()
      ]);

      setFutureConcerts(future);
      setPastConcerts(past);
      setIsLoading(false);
    };

    fetchConcerts();
  }, []);

  const handleImageClick = (imageUrl: string, alt: string) => {
    setSelectedImage({ url: imageUrl, alt });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <main className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className="text-center text-gray-400">chargement...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.concertsList}>
          {futureConcerts.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>prochains concerts</h2>
              <div className={styles.concertsGrid}>
                {futureConcerts.map((concert) => (
                  <ConcertInfo
                    key={concert.venue}
                    concert={concert}
                    onImageClick={(imageUrl: string) => handleImageClick(imageUrl, concert.venue)}
                  />
                ))}
              </div>
            </section>
          )}

          {pastConcerts.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>concerts passés</h2>
              <div className={styles.concertsGrid}>
                {pastConcerts.map((concert) => (
                  <ConcertInfo
                    key={concert.venue}
                    concert={concert}
                    onImageClick={(imageUrl: string) => handleImageClick(imageUrl, concert.venue)}
                  />
                ))}
              </div>
            </section>
          )}

          {futureConcerts.length === 0 && pastConcerts.length === 0 && (
            <div className={styles.emptyMessage}>
              Aucun concert prévu pour le moment.
            </div>
          )}
        </div>

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage.url}
            alt={selectedImage.alt}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
};

export default ConcertsPage;