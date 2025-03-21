import React from 'react';
import PhotoCarousel from '@/components/PhotoCarousel';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { client } from '../../lib/tina-client';

const Portfolio = async () => {
  const photos = await client.getAllPhotos();

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.portfolioContainer}>
          <PhotoCarousel photos={photos} />
        </div>
      </div>
    </main>
  );
};

export default Portfolio;