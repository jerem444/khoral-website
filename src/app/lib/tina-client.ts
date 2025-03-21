import { client as tinaClient } from "../../../tina/__generated__/client";
import { 
  PhotosPhotos, 
  PhotosConnectionQueryVariables,
  ConcertsConcerts,
  ConcertsConnectionQueryVariables,
  VideosVideos,
  VideosConnectionQueryVariables
} from "../../../tina/__generated__/types";

export const client = {
  ...tinaClient,
  
  // Photos
  async getAllPhotos(variables?: PhotosConnectionQueryVariables): Promise<PhotosPhotos[]> {
    const response = await tinaClient.queries.photosConnection(variables);
    return response.data.photosConnection.edges
      ?.map(edge => edge?.node?.photos)
      .flat()
      .filter(Boolean) as PhotosPhotos[];
  },
  
  // Concerts
  async getNextConcert(): Promise<ConcertsConcerts | undefined> {
    const today = new Date().toISOString();
    const variables: ConcertsConnectionQueryVariables = {
      sort: "date",
      filter: { concerts: { date: { after: today } } },
      first: 1
    };
    const response = await tinaClient.queries.concertsConnection(variables);
    return response?.data?.concertsConnection?.edges?.[0]?.node?.concerts?.[0] || undefined;
  },
  
  // Vidéos
  async getLatestVideo(): Promise<VideosVideos | undefined> {
    const variables: VideosConnectionQueryVariables = { last: 1 };
    const response = await tinaClient.queries.videosConnection(variables);
    return response?.data?.videosConnection?.edges?.[0]?.node?.videos?.[0] || undefined;
  },
  
  async getAllVideos(variables?: VideosConnectionQueryVariables): Promise<VideosVideos[]> {
    const response = await tinaClient.queries.videosConnection(variables);
    return response.data.videosConnection.edges
      ?.map(edge => edge?.node?.videos)
      .flat()
      .filter(Boolean) as VideosVideos[];
  },

  async getAllConcerts(variables?: ConcertsConnectionQueryVariables): Promise<ConcertsConcerts[]> {
    const response = await tinaClient.queries.concertsConnection(variables);
    return response.data.concertsConnection.edges
      ?.map(edge => edge?.node?.concerts)
      .flat()
      .filter(Boolean) as ConcertsConcerts[];
  }
};