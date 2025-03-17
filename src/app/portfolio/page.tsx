import React from 'react';
import PhotoCarousel from '@/components/PhotoCarousel';
import { client } from "../../../tina/__generated__/client";
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export interface Photo {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Portfolio = async () => {
  const response = await client.queries.photosConnection();
  const photos = response.data.photosConnection.edges?.map((edge: any) => edge.node.photos).flat() || [];

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.portfolioContainer}>
          <PhotoCarousel images={photos} />
        </div>
      </div>
    </main>
  );
};

export default Portfolio;