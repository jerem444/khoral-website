import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import VideoGrid from '@/components/VideoGrid';
import { client } from '../../lib/tina-client';


const Videos = async () => {
  const videos = await client.getAllVideos();

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.videoContainer}>
          <VideoGrid videos={videos} />
        </div>
      </div>
    </main>
  );
};

export default Videos;