import { client } from "@/lib/tina-client";
import { VideoPartsFragment } from "../../../../tina/__generated__/types";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import styles from "../page.module.css";

async function getVideo(
  slug: string
): Promise<VideoPartsFragment | null> {
  try {
    const { data } = await client.queries.video({
      relativePath: `${slug}.json`,
    });
    return data.video;
  } catch {
    return null;
  }
}

interface VideoPageProps {
  params: { slug: string };
}

export default async function VideoPage(props: VideoPageProps) {
  const params = await props.params;
  const video = await getVideo(params.slug);
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
