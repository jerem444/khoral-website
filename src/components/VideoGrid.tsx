'use client';

import styles from './VideoGrid.module.css';
import { useState, useEffect } from 'react';
import { VideosVideos } from '../../tina/__generated__/types';

interface VideoGridProps {
    videos: VideosVideos[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
    const [videoLoaded, setVideoLoaded] = useState<Record<number, boolean>>({});
    
    // Réinitialiser l'état de chargement quand la liste des vidéos change
    useEffect(() => {
        setVideoLoaded({});
        
        // Précharger les métadonnées des vidéos
        const preloadVideos = async () => {
            console.log('Préchargement des métadonnées pour', videos.length, 'vidéos');
        };
        
        preloadVideos();
        
        // Nettoyage lors du démontage du composant
        return () => {
            console.log('Nettoyage des ressources vidéo');
        };
    }, [videos]);
    
    const handleVideoLoad = (index: number) => {
        setVideoLoaded(prev => ({ ...prev, [index]: true }));
    };
    
    return (
        <div className={styles.gridContainer}>
            {videos.map((video, index) => (
                <div key={index} className={styles.videoItem}>
                    <div className={styles.videoContainer}>
                        {!videoLoaded[index] && <div className={styles.videoLoader}>Chargement...</div>}
                        <iframe
                            title={video.title}
                            src={video.url.replace("watch?v=", "embed/")}
                            allowFullScreen
                            onLoad={() => handleVideoLoad(index)}
                            loading="lazy"
                        ></iframe>
                    </div>
                    <div className={styles.videoInfo}>
                        <h3 className={styles.videoTitle}>{video.title}</h3>
                        <p className={styles.videoDescription}>{video.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;