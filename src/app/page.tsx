import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { client } from "../lib/data-client";
import HomeContent from "./HomeContent";

export default async function Home() {
  const [nextConcert, latestVideo, latestAlbum] = await Promise.all([
    client.getNextConcert(),
    client.getLatestVideo(),
    client.getLatestAlbum(),
  ]);

  return (
    <main className={styles.container}>
      <Navbar />
      <HomeContent
        nextConcert={nextConcert ?? null}
        latestVideo={latestVideo ?? null}
        latestAlbum={latestAlbum ?? null}
      />
    </main>
  );
}
