import React from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import VideoGrid from "@/components/VideoGrid";
import { client } from "../../lib/data-client";

const Videos = async () => {
  const videos = await client.getAllVideos();
  const clips = videos.filter((video) => video.type === "clip");
  const liveVideos = videos.filter((video) => video.type === "live");

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.videosList}>
          {clips.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>clips</h2>
              <VideoGrid videos={clips} />
            </section>
          )}
          {liveVideos.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>concerts live</h2>
              <VideoGrid videos={liveVideos} />
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default Videos;
