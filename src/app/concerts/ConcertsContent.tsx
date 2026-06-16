'use client';

import { useState } from 'react';
import type { Concert } from '@/lib/types';
import styles from './page.module.css';
import ConcertInfo from '@/components/ConcertInfo';
import ImageModal from '@/components/ImageModal';

interface ConcertsContentProps {
  futureConcerts: Concert[];
  pastConcerts: Concert[];
}

const ConcertsContent = ({ futureConcerts, pastConcerts }: ConcertsContentProps) => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  return (
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
                  onImageClick={(imageUrl: string) =>
                    setSelectedImage({ url: imageUrl, alt: concert.venue })
                  }
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
                  key={concert.venue + concert.date}
                  concert={concert}
                  onImageClick={(imageUrl: string) =>
                    setSelectedImage({ url: imageUrl, alt: concert.venue })
                  }
                />
              ))}
            </div>
          </section>
        )}

        {futureConcerts.length === 0 && pastConcerts.length === 0 && (
          <div className={styles.emptyMessage}>Aucun concert prévu pour le moment.</div>
        )}
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ConcertsContent;
