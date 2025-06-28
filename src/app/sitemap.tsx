import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://khoral-website.vercel.app',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://khoral-website.vercel.app/concerts',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://khoral-website.vercel.app/portfolio',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://khoral-website.vercel.app/musique',
      lastModified: new Date(),
      priority: 0.8,
    },
        {
      url: 'https://khoral-website.vercel.app/videos',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}