import Navbar from '@/components/Navbar';
import { client } from '@/lib/tina-client';
import AlbumInfo from '@/components/AlbumInfo';
import styles from './page.module.css';

const Albums = async () => {
   const [latestAlbum, ...otherAlbums] =await client.getAllAlbums();

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.albumsList}>
          {/* Dernier album */}
          {latestAlbum && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>dernier album</h2>
              <AlbumInfo album={latestAlbum} />
            </section>
          )}

          {/* Autres albums */}
          {otherAlbums.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>autres albums</h2>
              <div className={styles.albumsGrid}>
                {otherAlbums.map((album) => (
                  <AlbumInfo key={album.name} album={album} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default Albums;