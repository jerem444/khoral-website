import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ConcertInfo from '@/components/ConcertInfo';
import VideoGrid from '@/components/VideoGrid';
import styles from './page.module.css';
import { client } from './lib/tina-client';


export default async function Home() {
  const nextConcert = await client.getNextConcert();
  const latestVideo = await client.getLatestVideo()

  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.content}>
        <h1 className={styles.title}>
          khoral
        </h1>
        <div className={styles.buttonGroup}>
          <Link href="/musique" className={styles.button}>
            Écouter
          </Link>
          <Link href="/concerts" className={styles.button}>
            Concerts
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Prochain Concert</h2>
            {nextConcert ? (
              <ConcertInfo concert={nextConcert} variant="compact" />
            ) : (
              <p className={styles.noContent}>Aucun concert programmé pour le moment</p>
            )}
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Dernier Album</h2>
            <p className={styles.noContent}>All the Lost Weekends</p>
          </div>
        </div>

        <section className={styles.videosSection}>
          <h2 className={styles.sectionTitle}>Dernière Vidéo</h2>
          {latestVideo && <VideoGrid videos={[latestVideo]} />}
        </section>
      </section>
    </main>
  );
} 