'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import styles from './PhotoCarousel.module.css';

interface Photo {
  image: string;
  title: string;
  description: string;
  date : Date;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
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
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img src={photo.image} alt={`Photo ${index + 1}`} className={styles.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;