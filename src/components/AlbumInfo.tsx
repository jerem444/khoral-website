"use client";

import React from "react";
import Image from "next/image";
import { AlbumPartsFragment } from "../../tina/__generated__/types";
import cardStyles from "./Card.module.css";
import styles from "./AlbumInfo.module.css";

interface AlbumProps {
  album: AlbumPartsFragment;
  minimal?: boolean;
}

const Album: React.FC<AlbumProps> = ({ album, minimal }) => {
  return (
    <div className={cardStyles.card}>
      <div className={styles.albumContent}>
        <div className={styles.albumCoverContainer}>
          <Image
            src={album.coverImage}
            alt={`Cover of ${album.name}`}
            className={styles.albumCover}
            width={400}
            height={400}
            priority
          />
        </div>
        {!minimal && (
          <div className={styles.albumPlayerContainer}>
            <iframe
              className={styles.albumPlayer}
              src={`https://bandcamp.com/EmbeddedPlayer/album=${album.bandCampId}/size=large/bgcol=000000/linkcol=ffffff/artwork=none/transparent=true/`}
              seamless
            ></iframe>
          </div>
        )}
      </div>
      <div className={styles.albumFooter}>
        <p className={styles.albumReleaseDate}>
          {album.name.replaceAll("-", " ")} (
          {new Date(album.releaseDate).toLocaleDateString()})
        </p>
        {!minimal && (
          <div className={styles.buyButtonContainer}>
            <a
              href={`https://khoral.bandcamp.com/album/${album.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buyButton}
            >
              acheter
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Album;
