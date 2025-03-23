import { client as tinaClient } from "../../tina/__generated__/client";
import {
  PhotosPhotos,
  PhotosConnectionQueryVariables,
  ConcertPartsFragment,
  ConcertConnectionQueryVariables,
  VideosVideos,
  VideosConnectionQueryVariables
} from "../../tina/__generated__/types";

// Fonction utilitaire pour transformer les edges en tableau typé
const mapEdgesToNodes = <T>(edges: any[] | null | undefined): T[] =>
  (edges?.map(edge => edge?.node).filter(Boolean) || []) as T[];

export const client = {
  ...tinaClient,

  // Photos
  async getAllPhotos(variables?: PhotosConnectionQueryVariables): Promise<PhotosPhotos[]> {
    const response = await tinaClient.queries.photosConnection(variables);
    const nodes = mapEdgesToNodes<{ photos: PhotosPhotos[] }>(response.data.photosConnection.edges);
    return nodes.map(node => node.photos).flat().filter(Boolean) as PhotosPhotos[];
  },

  // Concerts
  async getNextConcert(): Promise<ConcertPartsFragment> {
    const now = new Date().toISOString();
    const variables: ConcertConnectionQueryVariables = {
      sort: "date",
      filter: { date: { after: now } },
      first: 1
    };

    const response = await tinaClient.queries.concertConnection(variables);
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges)[0];
  },

  // Vidéos
  async getLatestVideo(): Promise<VideosVideos | undefined> {
    const variables: VideosConnectionQueryVariables = { last: 1 };
    const response = await tinaClient.queries.videosConnection(variables);
    const nodes = mapEdgesToNodes<{ videos: VideosVideos[] }>(response.data.videosConnection.edges);
    return nodes[0]?.videos?.[0];
  },

  async getAllVideos(variables?: VideosConnectionQueryVariables): Promise<VideosVideos[]> {
    const response = await tinaClient.queries.videosConnection(variables);
    const nodes = mapEdgesToNodes<{ videos: VideosVideos[] }>(response.data.videosConnection.edges);
    return nodes.map(node => node.videos).flat().filter(Boolean) as VideosVideos[];
  },

  async getAllConcerts(variables?: ConcertConnectionQueryVariables): Promise<ConcertPartsFragment[]> {
    const response = await tinaClient.queries.concertConnection(variables);
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges);
  }
};