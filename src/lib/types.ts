export interface Concert {
  venue: string;
  date: string;
  city: string;
  address?: string;
  ticketUrl?: string;
  description?: string;
  image?: string;
  price?: number;
  slug: string;
}

export interface Video {
  title: string;
  date: string;
  url: string;
  description?: string;
  slug: string;
}

export interface Album {
  name: string;
  releaseDate: string;
  coverImage: string;
  bandCampId: string;
  slug: string;
}
