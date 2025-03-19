'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import { Photo } from '@/app/portfolio/page';
import styles from './PhotoCarousel.module.css';

interface PhotoCarouselProps {
  images: Photo[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ images }) => {
  return (
    <div className={styles.carouselContainer}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={5}
        navigation
        pagination
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.image} alt={`Photo ${index + 1}`} className={styles.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;