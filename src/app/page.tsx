'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ConcertInfo from '@/components/ConcertInfo';
import VideoGrid from '@/components/VideoGrid';
import ImageModal from '@/components/ImageModal';
import AlbumInfo from '@/components/AlbumInfo';
import cardStyles from '../components/Card.module.css';
import styles from './page.module.css';
import { client } from '../lib/tina-client';
import { useState, useEffect } from 'react';
import { ConcertPartsFragment, AlbumPartsFragment, VideoPartsFragment } from '../../tina/__generated__/types';

const Home = () => {
  const [nextConcert, setNextConcert] = useState<ConcertPartsFragment | null>(null);
  const [latestVideo, setLatestVideo] = useState<VideoPartsFragment| null>(null);
  const [latestAlbum, setLatestAlbum] = useState<AlbumPartsFragment| null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [concert, video, album] = await Promise.all([
        client.getNextConcert(),
        client.getLatestVideo(),
        client.getLatestAlbum()
      ]);
      setNextConcert(concert);
      setLatestVideo(video);
      setLatestAlbum(album);
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
          <div className={cardStyles.card}>
            <h2 className="mb-4 text-2xl font-bold">prochain concert</h2>
            {nextConcert ? (
              <ConcertInfo
                concert={nextConcert}
                onImageClick={(imageUrl: string) => setSelectedImage({ url: imageUrl, alt: nextConcert.venue })}
              />
            ) : (
              <p className={styles.noContent}>aucun concert programmé pour le moment</p>
            )}
          </div>
          <div className={cardStyles.card}>
            <h2 className="mb-4 text-2xl font-bold">dernier Album</h2>
            {latestAlbum && <AlbumInfo album={latestAlbum} minimal />}
          </div>
        </div>
        <div className={cardStyles.card}>
          <h2 className="mb-4 text-2xl font-bold">dernière vidéo</h2>
          {latestVideo && <VideoGrid videos={[latestVideo]} />}
        </div>
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