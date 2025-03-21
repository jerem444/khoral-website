import React from 'react';
import { client } from "../../../tina/__generated__/client";
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import VideoGrid from '@/components/VideoGrid';


const Videos = async () => {
  const response = await client.queries.videosConnection();
  const videos = response.data.videosConnection.edges?.map((edge: any) => edge.node.videos).flat() || [];

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