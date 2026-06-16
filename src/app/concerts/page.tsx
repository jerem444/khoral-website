import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { client } from "@/lib/data-client";
import ConcertsContent from "./ConcertsContent";

export default async function ConcertsPage() {
  const [futureConcerts, pastConcerts] = await Promise.all([
    client.getFutureConcerts(),
    client.getPastConcerts(),
  ]);

  return (
    <main className={styles.container}>
      <Navbar />
      <ConcertsContent
        futureConcerts={futureConcerts}
        pastConcerts={pastConcerts}
      />
    </main>
  );
}
