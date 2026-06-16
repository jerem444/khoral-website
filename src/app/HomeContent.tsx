"use client";

import { useState } from "react";
import Link from "next/link";
import ConcertInfo from "@/components/ConcertInfo";
import VideoGrid from "@/components/VideoGrid";
import ImageModal from "@/components/ImageModal";
import AlbumInfo from "@/components/AlbumInfo";
import cardStyles from "../components/Card.module.css";
import styles from "./page.module.css";
import type { Concert, Video, Album } from "@/lib/types";

interface HomeContentProps {
  nextConcert: Concert | null;
  latestVideo: Video | null;
  latestAlbum: Album | null;
}

const HomeContent = ({
  nextConcert,
  latestVideo,
  latestAlbum,
}: HomeContentProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  return (
    <>
      <section className={styles.content}>
        <div className={styles.buttonGroup}>
          <Link href="/musique" className={styles.button}>
            musique
          </Link>
          <Link href="/concerts" className={styles.button}>
            concerts
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={cardStyles.card}>
            <h2 className="mb-4 text-2xl font-bold">prochain concert</h2>
            {nextConcert ? (
              <ConcertInfo
                concert={nextConcert}
                onImageClick={(imageUrl: string) =>
                  setSelectedImage({ url: imageUrl, alt: nextConcert.venue })
                }
              />
            ) : (
              <p className={styles.noContent}>
                aucun concert programmé pour le moment
              </p>
            )}
          </div>
          <div className={cardStyles.card}>
            <h2 className="mb-4 text-2xl font-bold">dernier Album</h2>
            {latestAlbum && <AlbumInfo album={latestAlbum} minimal />}
          </div>
        </div>
        <div className={cardStyles.card}>
          <h2 className="mb-4 text-2xl font-bold">dernière vidéo</h2>
          {latestVideo && <VideoGrid videos={[latestVideo]} />}
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default HomeContent;
