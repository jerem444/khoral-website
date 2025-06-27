'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ConcertInfo from '@/components/ConcertInfo';
import VideoGrid from '@/components/VideoGrid';
import ImageModal from '@/components/ImageModal';
import styles from './page.module.css';
import { client } from '../lib/tina-client';
import { useState, useEffect } from 'react';
import { ConcertPartsFragment } from '../../tina/__generated__/types';

const Home = () => {
  const [nextConcert, setNextConcert] = useState<ConcertPartsFragment | null>(null);
  const [latestVideo, setLatestVideo] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [concert, video] = await Promise.all([
        client.getNextConcert(),
        client.getLatestVideo()
      ]);
      setNextConcert(concert);
      setLatestVideo(video);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.content}>
        <div className={styles.buttonGroup}>
          <Link href="/musique" className={styles.button}>
            musique
          </Link>
          <Link href="/concerts" className={styles.button}>
            concerts
          </Link>
        </div>

        <div className={styles.grid}>
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">prochain concert</h2>
            {nextConcert ? (
              <ConcertInfo 
                concert={nextConcert} 
                onImageClick={(imageUrl: string) => setSelectedImage({ url: imageUrl, alt: nextConcert.venue })}
              />
            ) : (
              <p className={styles.noContent}>aucun concert programmé pour le moment</p>
            )}
          </div>
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">dernier Album</h2>
            <p className={styles.noContent}>all the lost weekends</p>
          </div>
        </div>

        <section className={styles.videosSection}>
          <h2 className={styles.sectionTitle}>dernière vidéo</h2>
          {latestVideo && <VideoGrid videos={[latestVideo]} />}
        </section>
      </section>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}

export default Home; 