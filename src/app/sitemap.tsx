import { MetadataRoute } from 'next'
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages statiques principales
  const staticPages = [
    '',
    'concerts',
    'portfolio',
    'musique',
    'videos',
    'bio',
  ];

  const baseUrl = 'https://khoral.fr';
  const now = new Date();

  // Génération dynamique des concerts
  let concertUrls: MetadataRoute.Sitemap = [];
  try {
    const concertsDir = path.join(process.cwd(), 'src/data/concerts');
    const concertFiles = fs.readdirSync(concertsDir).filter(f => f.endsWith('.json'));
    concertUrls = concertFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        url: `${baseUrl}/concerts/${slug}`,
        lastModified: now,
        priority: 0.7,
      };
    });
  } catch { /* empty */ }

  // Génération dynamique des albums
  let albumUrls: MetadataRoute.Sitemap = [];
  try {
    const albumsDir = path.join(process.cwd(), 'src/data/albums');
    const albumFiles = fs.readdirSync(albumsDir).filter(f => f.endsWith('.json'));
    albumUrls = albumFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        url: `${baseUrl}/albums/${slug}`,
        lastModified: now,
        priority: 0.7,
      };
    });
  } catch { /* empty */ }

  // Génération dynamique des vidéos
  let videoUrls: MetadataRoute.Sitemap = [];
  try {
    const videosDir = path.join(process.cwd(), 'src/data/videos');
    const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.json'));
    videoUrls = videoFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        url: `${baseUrl}/videos/${slug}`,
        lastModified: now,
        priority: 0.7,
      };
    });
  } catch { /* empty */ }

  // Pages statiques
  const staticUrls: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page ? '/' + page : ''}`,
    lastModified: now,
    priority: page === '' ? 1 : 0.8,
  }));

  return [
    ...staticUrls,
    ...concertUrls,
    ...albumUrls,
    ...videoUrls,
  ];
}