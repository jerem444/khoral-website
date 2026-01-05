import { client } from "@/lib/tina-client";
import { notFound } from "next/navigation";
import styles from "../page.module.css";
import { ConcertPartsFragment } from "../../../../tina/__generated__/types";
import Navbar from "@/components/Navbar";
import ConcertInfo from "@/components/ConcertInfo";

async function getConcert(slug: string): Promise<ConcertPartsFragment | null> {
  try {
    const { data } = await client.queries.concert({ relativePath: `${slug}.json` });
    return data.concert;
  } catch {
    return null;
  }
}

interface ConcertPageProps {
  params: { slug: string };
}

export default async function ConcertPage(props: ConcertPageProps) {
  const params = await props.params;
  const concert = await getConcert(params.slug);
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
