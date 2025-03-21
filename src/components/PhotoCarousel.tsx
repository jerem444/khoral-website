'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import styles from './PhotoCarousel.module.css';

interface Photo {
  image: string;
  title: string;
  description: string;
  date: Date;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  
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
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
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
                  <img src={photo.image} alt={photo.title} className={styles.image} />
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