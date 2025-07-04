import { client as tinaClient } from "../../tina/__generated__/client";
import {
  ConcertPartsFragment,
  VideoPartsFragment,
  AlbumPartsFragment
} from "../../tina/__generated__/types";

// Fonction utilitaire pour transformer les edges en tableau typé
const mapEdgesToNodes = <T>(edges: any[] | null | undefined): T[] =>
  (edges?.map(edge => edge?.node).filter(Boolean) || []) as T[];

const LAST_MAX = 100;
export const client = {
  ...tinaClient,

  // Concerts
  async getNextConcert(): Promise<ConcertPartsFragment> {
    const now = new Date().toISOString();
    const response = await tinaClient.queries.concertConnection({
      sort: "date",
      filter: { date: { after: now } },
      first: 1
    });
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges)[0];
  },

  async getFutureConcerts(): Promise<ConcertPartsFragment[]> {
    const now = new Date().toISOString();
    const response = await tinaClient.queries.concertConnection({
      sort: "date", // Ordre croissant pour les concerts futurs
      filter: { date: { after: now } },
      first: 100 // Limiter à 100 concerts futurs
    });
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges);
  },

  async getPastConcerts(): Promise<ConcertPartsFragment[]> {
    const now = new Date().toISOString();
    const response = await tinaClient.queries.concertConnection({
      sort: "date",
      filter: { date: { before: now } },
      last: LAST_MAX // Récupérer les 100 derniers concerts passés
    });
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges);
  },

  // Vidéos
  async getLatestVideo(): Promise<VideoPartsFragment> {
    const response = await tinaClient.queries.videoConnection( {
      sort: "date",
      last: 1 // Récupérer la dernière vidéo
    });
    return mapEdgesToNodes<VideoPartsFragment>(response.data.videoConnection.edges)[0];
  },

  async getAllVideos(): Promise<VideoPartsFragment[]> {
    const response = await tinaClient.queries.videoConnection({
      sort: "date",
      last: LAST_MAX, // Récupérer les 100 dernières vidéos
    });
    return mapEdgesToNodes<VideoPartsFragment>(response.data.videoConnection.edges);
  },

  async getAllConcerts(): Promise<ConcertPartsFragment[]> {
    const response = await tinaClient.queries.concertConnection({
      sort: "date",
      last: LAST_MAX, // Récupérer les 100 derniers concerts
    });
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges);
  },

  async getAllAlbums(): Promise<AlbumPartsFragment[]> {
    const response = await tinaClient.queries.albumConnection({
      sort: "releaseDate",
      last: LAST_MAX, // Récupérer les 100 derniers albums
    });
    return mapEdgesToNodes<AlbumPartsFragment>(response.data.albumConnection.edges);
  },

  async getLatestAlbum(): Promise<AlbumPartsFragment> {
    const response = await tinaClient.queries.albumConnection({
      sort: "releaseDate",
      last: 1 // Récupérer le dernier album
    });
    return mapEdgesToNodes<AlbumPartsFragment>(response.data.albumConnection.edges)[0];
  }
};