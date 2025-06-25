import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { client } from '../../lib/tina-client';

const Portfolio = async () => {
  const photos = await client.getAllPhotos();

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.grid}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.card}>
              <img src={photo.image} alt={photo.title} className={styles.image} />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{photo.title}</h3>
                <p className={styles.description}>{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;