'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType, NavigationOptions } from 'swiper/types';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import styles from './PhotoCarousel.module.css';
import { PhotosPhotos } from "../../tina/__generated__/types";

interface PhotoCarouselProps {
  photos: PhotosPhotos[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détecter si on est sur mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Vérifier au chargement
    checkIsMobile();
    
    // Vérifier au redimensionnement
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div ref={prevRef} className={`${styles.navButton} ${styles.prevButton}`}></div>
        <div ref={nextRef} className={`${styles.navButton} ${styles.nextButton}`}></div>
        
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={isMobile ? false : {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper: SwiperType) => {
            if (!isMobile) {
              const nav = swiper.params.navigation as NavigationOptions;
              if (nav) {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }
          }}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          className={`${styles.mySwiper} ${styles.paginationContainer}`}
          breakpoints={{
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className={styles.slideContent}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={photo.image} 
                    alt={photo.title} 
                    className={styles.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.photoOverlay}>
                    <div className={styles.photoInfo}>
                      <h3 className={styles.photoTitle}>{photo.title}</h3>
                      <p className={styles.photoDescription}>{photo.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PhotoCarousel;