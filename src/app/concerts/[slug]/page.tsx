import { client } from "@/lib/data-client";
import { notFound } from "next/navigation";
import styles from "../page.module.css";
import Navbar from "@/components/Navbar";
import ConcertInfo from "@/components/ConcertInfo";

export async function generateStaticParams() {
  const concerts = await client.getAllConcerts();
  return concerts.map((c) => ({ slug: c.slug }));
}

interface ConcertPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ConcertPage(props: ConcertPageProps) {
  const params = await props.params;
  const concert = await client.getConcertBySlug(params.slug);
  if (!concert) return notFound();

  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.content}>
        <h1 className={styles.sectionTitle}>Concert</h1>
        <ConcertInfo concert={concert} />
      </section>
    </main>
  );
}
