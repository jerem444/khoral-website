import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Concert, Video, Album } from "./types";

const DATA_DIR = path.join(process.cwd(), "src/data");

async function readJsonDir<T>(
  subDir: string,
): Promise<(T & { slug: string })[]> {
  const dirPath = path.join(DATA_DIR, subDir);
  const files = await readdir(dirPath);
  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (file) => {
        const slug = file.replace(".json", "");
        const raw = await readFile(path.join(dirPath, file), "utf-8");
        return { ...(JSON.parse(raw) as T), slug };
      }),
  );
  return items;
}

async function getBySlug<T>(
  subDir: string,
  slug: string,
): Promise<(T & { slug: string }) | null> {
  try {
    const raw = await readFile(
      path.join(DATA_DIR, subDir, `${slug}.json`),
      "utf-8",
    );
    return { ...(JSON.parse(raw) as T), slug };
  } catch {
    return null;
  }
}

export const client = {
  async getAllConcerts(): Promise<Concert[]> {
    const concerts = await readJsonDir<Concert>("concerts");
    return concerts.sort((a, b) => a.date.localeCompare(b.date));
  },

  async getFutureConcerts(): Promise<Concert[]> {
    const now = new Date().toISOString();
    return (await this.getAllConcerts()).filter((c) => c.date > now);
  },

  async getPastConcerts(): Promise<Concert[]> {
    const now = new Date().toISOString();
    return (await this.getAllConcerts()).filter((c) => c.date <= now).reverse();
  },

  async getNextConcert(): Promise<Concert | undefined> {
    return (await this.getFutureConcerts())[0];
  },

  async getConcertBySlug(slug: string): Promise<Concert | null> {
    return getBySlug<Concert>("concerts", slug);
  },

  async getAllVideos(): Promise<Video[]> {
    const videos = await readJsonDir<Video>("videos");
    return videos.sort((a, b) => b.date.localeCompare(a.date));
  },

  async getLatestVideo(): Promise<Video | undefined> {
    return (await this.getAllVideos())[0];
  },

  async getVideoBySlug(slug: string): Promise<Video | null> {
    return getBySlug<Video>("videos", slug);
  },

  async getAllAlbums(): Promise<Album[]> {
    const albums = await readJsonDir<Album>("albums");
    return albums.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  },

  async getLatestAlbum(): Promise<Album | undefined> {
    return (await this.getAllAlbums())[0];
  },
};
