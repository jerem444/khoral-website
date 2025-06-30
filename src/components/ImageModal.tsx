'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './ImageModal.module.css';

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, alt, onClose }: ImageModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
      >
        {!isLoading && (
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Fermer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        <Image
          src={imageUrl}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 80vw"
          width={1200}
          height={800}
          quality={75}
          loading="lazy"
          className={styles.modalImage}
          onLoadingComplete={() => setIsLoading(false)}
        />

        {isLoading && (
          <div className={styles.spinner}>
            chargement...
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;