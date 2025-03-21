import Navbar from "@/components/Navbar";
import styles from './page.module.css';
import { client } from "../lib/tina-client";
import { ConcertsConcerts } from "../../../tina/__generated__/types";
import ConcertInfo from "@/components/ConcertInfo";

const ConcertsPage = async () => {
  const concerts = await client.getAllConcerts();

  // Séparer les concerts futurs et passés
  const now = new Date();
  const futureConcerts = concerts.filter((concert: ConcertsConcerts) => new Date(concert.date) > now);
  const pastConcerts = concerts.filter((concert: ConcertsConcerts) => new Date(concert.date) <= now);

  // Trier les concerts futurs par date
  futureConcerts.sort((a: ConcertsConcerts, b: ConcertsConcerts) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {/* Section pour les concerts futurs */}
        <h1 className={styles.title}>Prochains Concerts</h1>
        <div className={styles.concertsList}>
          {futureConcerts.map((concert: ConcertsConcerts, index: number) => (
            <div key={index} className={styles.concertCard}>
              <ConcertInfo concert={concert} variant="card" />
            </div>
          ))}

          {futureConcerts.length === 0 && (
            <p className={styles.emptyMessage}>Aucun concert programmé pour le moment.</p>
          )}

          {/* Section pour les concerts passés */}
          <h1 className={styles.title}>Concerts passés</h1>
          {pastConcerts.map((concert: ConcertsConcerts, index: number) => (
            <div key={index} className={styles.concertCard}>
              <ConcertInfo concert={concert} variant="card" />
            </div>
          ))}

          {pastConcerts.length === 0 && (
            <p className={styles.emptyMessage}>Aucun concert passé.</p>
          )}
        </div>
      </div>
    </main>
  );
} 

export default ConcertsPage;