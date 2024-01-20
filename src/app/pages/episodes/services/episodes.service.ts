import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
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

  getAllEpisodes(nameFilter?): Observable<EpisodeApiResponse> {
    let params = new HttpParams();
    if (nameFilter) {
      params = params.append('name', nameFilter);
    } else {
      params = null;
    }

    return this.http.get<EpisodeApiResponse>(this.url, { params: params }).pipe(
      catchError((error) => {
        return of({ info: null, results: [] });
      })
    );
  }

  getEpisodeById(id: string): Observable<EpisodeEntity> {
    return this.http.get<EpisodeEntity>(this.url + id);
  }

  getEpisodesByIds(ids: string[]): Observable<EpisodeEntity[]> {
    return this.http.get<EpisodeEntity[]>(this.url + ids.toString());
  }
}
