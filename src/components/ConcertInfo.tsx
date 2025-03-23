import styles from './ConcertInfo.module.css';
import { ConcertPartsFragment } from '../../tina/__generated__/types';
import Image from 'next/image';


interface ConcertInfoProps {
  concert: ConcertPartsFragment;
  variant?: 'card' | 'compact';
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });
};

export default function ConcertInfo({ concert, variant = 'card' }: ConcertInfoProps) {

  const concertDate = new Date(concert.date);

  return (
    <div className={`${styles.concertInfo} ${styles[variant]}`}>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.venueInfo}>
            <h3 className={styles.venueName}>{concert.venue}</h3>
            <p className={styles.city}>{concert.city}</p>
            {concert.address && variant === 'card' && (
              <p className={styles.address}>{concert.address}</p>
            )}
          </div>
          
          <div className={styles.dateInfo}>
            <p className={styles.date}>{formatDate(concertDate)}</p>
            <p className={styles.time}>{formatTime(concertDate)}</p>
            {concert.price && variant === 'card' && (
              <p className={styles.price}>{concert.price}€</p>
            )}
          </div>

          {concert.description && variant === 'card' && (
            <p className={styles.description}>{concert.description}</p>
          )}
        </div>

        {concert.image && (
          <div className={styles.imageWrapper}>
            <Image 
              src={concert.image} 
              alt={concert.venue}
              width={300}
              height={300}
              style={{ objectFit: 'cover' }}
              className={styles.concertImage}
            />
          </div>
        )}
      </div>
      
      {concert.ticketUrl && (
        <div className={styles.buttonContainer}>
          <a
            href={concert.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Réserver
          </a>
        </div>
      )}
    </div>
  );
} 