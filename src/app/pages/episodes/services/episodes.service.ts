import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EpisodeApiResponse,
  EpisodeEntity,
} from '../models/episodes.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly http = inject(HttpClient);
  url = 'https://rickandmortyapi.com/api/episode/';
  constructor() {}

  getAllEpisodes(): Observable<EpisodeApiResponse> {
    return this.http.get<EpisodeApiResponse>(this.url);
  }

  getEpisodeById(id: string): Observable<EpisodeEntity> {
    return this.http.get<EpisodeEntity>(this.url + id);
  }

  getEpisodesByIds(ids: string[]): Observable<EpisodeEntity[]> {
    return this.http.get<EpisodeEntity[]>(this.url + ids.toString());
  }
}
