import { client } from "@/lib/data-client";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";

export async function generateStaticParams() {
  const videos = await client.getAllVideos();
  return videos.map((v) => ({ slug: v.slug }));
}

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function VideoPage(props: VideoPageProps) {
  const params = await props.params;
  const video = await client.getVideoBySlug(params.slug);
  if (!video) return notFound();

  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.content}>
        <h1>{video.title}</h1>
        <iframe
          width="560"
          height="315"
          src={video.url.replace("watch?v=", "embed/")}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>
    </main>
  );
}
