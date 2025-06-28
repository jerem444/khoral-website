'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { client } from '../../lib/tina-client';
import Image from 'next/image';
import { PhotosPhotos } from '../../../tina/__generated__/types';
import ImageModal from '@/components/ImageModal';

const Portfolio = () => {
  const [photos, setPhotos] = useState<PhotosPhotos[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  // Charger les photos
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await client.getAllPhotos();
      setPhotos(data);
    };
    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.grid}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.card}>
              <Image
                src={photo.image}
                alt={photo.title}
                width={300}
                height={200}
                className={`${styles.image} cursor-pointer transition-transform hover:scale-105`}
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzEyMTIxMiIvPjwvc3ZnPg=="
                loading="lazy"
                onClick={() => photo.image && setSelectedImage({
                  url: photo.image,
                  alt: photo.title || 'Photo'
                })}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
};

export default Portfolio;