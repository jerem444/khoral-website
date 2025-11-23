"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import ImageModal from "@/components/ImageModal";
import { ImageData } from "../api/portfolio-images/route";
import Image from "next/image";

const Portfolio = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/portfolio-images");
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <main className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.grid}>
          {images.map((image) => (
            <div key={image.alt} className={styles.card}>
              <Image
                src={image.url}
                alt={image.alt}
                width={300}
                height={200}
                className={`${styles.image} cursor-pointer transition-transform hover:scale-105`}
                onClick={() =>
                  setSelectedImage({ url: image.url, alt: image.name })
                }
              />
              <p className={styles.imageName}>{image.name}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
};

export default Portfolio;
