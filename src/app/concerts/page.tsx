import { client } from "../../../tina/__generated__/client";
import Navbar from "@/components/Navbar";
import ConcertInfo from "@/components/ConcertInfo";
import styles from './page.module.css';

export interface Concert {
  venue: string;
  city: string;
  date: string;
  address?: string;
  description?: string;
  ticketUrl?: string;
  price?: number;
  image?: string;
}

const ConcertsPage = async () => {
  const response = await client.queries.concertsConnection();
  const concerts = response.data.concertsConnection.edges?.map((edge: any) => edge.node.concerts).flat() || [];

  // Séparer les concerts futurs et passés
  const now = new Date();
  const futureConcerts = concerts.filter((concert: Concert) => new Date(concert.date) > now);
  const pastConcerts = concerts.filter((concert: Concert) => new Date(concert.date) <= now);

  // Trier les concerts futurs par date
  futureConcerts.sort((a: Concert, b: Concert) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {/* Section pour les concerts futurs */}
        <h1 className={styles.title}>Prochains Concerts</h1>
        <div className={styles.concertsList}>
          {futureConcerts.map((concert: Concert, index: number) => (
            <div key={index} className={styles.concertCard}>
              <ConcertInfo concert={concert} variant="card" />
            </div>
          ))}

          {futureConcerts.length === 0 && (
            <p className={styles.emptyMessage}>Aucun concert programmé pour le moment.</p>
          )}

          {/* Section pour les concerts passés */}
          <h1 className={styles.title}>Concerts passés</h1>
          {pastConcerts.map((concert: Concert, index: number) => (
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