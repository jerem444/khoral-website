'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import styles from './page.module.css';
import { useEmail } from '@/lib/useEmail';


const Bio = () => {
    const email = useEmail();
    return (
        <main className={styles.container}>
            <Navbar />
            <section className={styles.content}>
                <h1 className={styles.sectionTitle}>bio</h1>

                <div className={styles.bioContent}>
                    {/* Première image promo */}
                    <div className={styles.imageContainer}>
                        <Image
                            src="/src/assets/images/bio/promo1.jpg"
                            alt="Khoral - Photo promo 1"
                            width={1200}
                            height={600}
                            className={`${styles.promoImage} ${styles.smallPromoImage}`}
                        />
                    </div>

                    <div className={styles.bioText}>
                        <p>
                            <b>khoral</b> est un trio coldwave nantais.
                        </p>
                        <p>
                            <b>karim</b>, chanteur et claviériste, est à l'origine du projet, initialement orienté vers la synthpop..
                        </p>
                        <p>
                            <b>jérémy</b>, bassiste issu de la scène metal, et <b>denis</b>, guitariste venant du garage rock,
                            ont rejoint les rangs de la formation pour compléter son univers musical.</p>
                        <p>
                            ensemble ils proposent une musique puisant à la fois dans la new wave de the cure ou bowie 'période berlinoise'
                            et dans l'electro-indus des années 2000.
                        </p>
                    </div>

                    {/* Seconde image promo */}
                    <div className={styles.imageContainer}>
                        <Image
                            src="/src/assets/images/bio/promo2.jpg"
                            alt="Khoral - Photo promo 2"
                            width={1200}
                            height={600}
                            className={styles.promoImage}
                        />
                    </div>

                    {/* Bouton contact */}
                    <div className={styles.contactButtonContainer}>
                        <a
                            href={`mailto:${email}`}
                            className={styles.contactButton}
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `mailto:${email}`;
                            }}
                            aria-label="Email"
                        >
                            nous contacter
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Bio;