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
}

export default async function ConcertsPage() {
  const response = await client.queries.concertsConnection();
  const concerts = response.data.concertsConnection.edges?.map((edge: any) => edge.node as Concert) || [];

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.title}>Concerts</h1>
        <div className={styles.concertsList}>
          {concerts.map((concert: Concert, index: number) => (
            <div key={index} className={styles.concertCard}>
              <ConcertInfo concert={concert} variant="card" />
            </div>
          ))}
          
          {concerts.length === 0 && (
            <p className={styles.emptyMessage}>Aucun concert programmé pour le moment.</p>
          )}
        </div>
      </div>
    </main>
  );
} 