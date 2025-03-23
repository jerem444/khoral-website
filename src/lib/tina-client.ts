import { client as tinaClient } from "../../tina/__generated__/client";
import {
  PhotosPhotos,
  PhotosConnectionQueryVariables,
  ConcertPartsFragment,
  ConcertConnectionQueryVariables,
  VideoPartsFragment,
  VideoConnectionQueryVariables
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
  async getNextConcert(): Promise<ConcertPartsFragment | undefined> {
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
  async getLatestVideo(): Promise<VideoPartsFragment | undefined> {
    const variables: VideoConnectionQueryVariables = {
      sort: "date",
      last: 1
    };
    const response = await tinaClient.queries.videoConnection(variables);
    return mapEdgesToNodes<VideoPartsFragment>(response.data.videoConnection.edges)[0];
  },

  async getAllVideos(variables?: VideoConnectionQueryVariables): Promise<VideoPartsFragment[]> {
    const response = await tinaClient.queries.videoConnection(variables);
    return mapEdgesToNodes<VideoPartsFragment>(response.data.videoConnection.edges);
  },

  async getAllConcerts(variables?: ConcertConnectionQueryVariables): Promise<ConcertPartsFragment[]> {
    const response = await tinaClient.queries.concertConnection(variables);
    return mapEdgesToNodes<ConcertPartsFragment>(response.data.concertConnection.edges);
  }
};