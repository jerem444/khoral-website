'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faSpotify,
    faApple,
    faBandcamp
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const encodedEmail = 'YXV0b21hdGEucHJvZC5hc3NvQGdtYWlsLmNvbQ==';
        const decodedEmail = atob(encodedEmail);
        setEmail(decodedEmail);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <div className={styles.socialLinks}>
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className={styles.socialLink}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `mailto:${email}`;
                                    }}
                                    aria-label="Email"
                                >
                                    <FontAwesomeIcon icon={faEnvelope} className={styles.socialIcon} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.socialLinks}>
                            <a
                                href="https://www.facebook.com/khoral80"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebookF} className={styles.socialIcon} />
                            </a>
                            <a
                                href="https://www.instagram.com/khoral80"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.socialLinks}>
                            {/* <a
                                href="https://open.spotify.com/artist/khoral"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Spotify"
                            >
                                <FontAwesomeIcon icon={faSpotify} className={styles.socialIcon} />
                            </a>
                            <a
                                href="https://music.apple.com/artist/khoral"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Apple Music"
                            >
                                <FontAwesomeIcon icon={faApple} className={styles.socialIcon} />
                            </a> */}
                            <a
                                href="https://khoral.bandcamp.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Bandcamp"
                            >
                                <FontAwesomeIcon icon={faBandcamp} className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    © {new Date().getFullYear()} Khoral. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;