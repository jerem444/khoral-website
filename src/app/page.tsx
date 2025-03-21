import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ConcertInfo from '@/components/ConcertInfo';
import VideoGrid from '@/components/VideoGrid';
import { client } from "../../tina/__generated__/client";
import { Concert } from "@/app/concerts/page";
import styles from './page.module.css';

async function getNextConcert() {
  const response = await client.queries.concertsConnection();
  const concerts = response.data.concertsConnection.edges?.map((edge: any) => edge.node.concerts).flat() || [];
  
  // Filtrer les concerts futurs et les trier par date
  const futureConcerts = concerts
    .filter((concert: Concert) => new Date(concert.date) > new Date())
    .sort((a: Concert, b: Concert) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return futureConcerts[0]; // Retourne le prochain concert ou undefined
}

// Fonction pour récupérer la dernière vidéo
async function getLatestVideo() {
  const response = await client.queries.videosConnection();
  const videos = response.data.videosConnection.edges?.map((edge: any) => edge.node.videos).flat() || [];
  return videos[0]; 

}

export default async function Home() {
  const nextConcert = await getNextConcert();
  const latestVideo = await getLatestVideo();

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
          <h2 className={styles.sectionTitle}>Notre Dernière Vidéo</h2>
          {latestVideo && <VideoGrid videos={[latestVideo]} />}
        </section>
      </section>
    </main>
  );
} 