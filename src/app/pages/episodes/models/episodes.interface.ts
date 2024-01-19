export interface EpisodeApiResponse {
  info: Info;
  results: EpisodeEntity[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}

export interface EpisodeEntity {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
