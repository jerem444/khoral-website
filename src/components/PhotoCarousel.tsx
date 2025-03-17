'use client'

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Photo } from '@/app/portfolio/page';
import styles from './PhotoCarousel.module.css';

interface PhotoCarouselProps {
  images: Photo[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ images }) => {
  const swiperRef = useRef<any>(null); // Référence pour le Swiper

  const handleClick = (event: React.MouseEvent) => {
    const { clientX } = event; // Position du clic
    const centerX = window.innerWidth / 2; // Centre de l'écran

    if (clientX < centerX) {
      // Clic à gauche du centre
      swiperRef.current.swiper.slidePrev(); // Faire défiler vers la gauche
    } else {
      // Clic à droite du centre
      swiperRef.current.swiper.slideNext(); // Faire défiler vers la droite
    }
  };

  return (
    <div className={styles.carouselContainer} onClick={handleClick}>
      <Swiper ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.image} alt={`Photo ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;