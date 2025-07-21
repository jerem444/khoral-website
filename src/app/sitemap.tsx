import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://khoral.fr',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://khoral.fr/concerts',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://khoral.fr/portfolio',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://khoral.fr/musique',
      lastModified: new Date(),
      priority: 0.8,
    },
        {
      url: 'https://khoral.fr/videos',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://khoral.fr/bio',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}