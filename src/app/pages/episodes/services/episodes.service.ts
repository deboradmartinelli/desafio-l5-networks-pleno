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
        const info = {
          count: 0,
          pages: 0,
          next: '',
          prev: '',
        };
        return of({ info, results: [] });
      })
    );
  }

  getNextPage(url): Observable<EpisodeApiResponse> {
    return this.http.get<EpisodeApiResponse>(url);
  }

  getEpisodeById(id: string): Observable<EpisodeEntity> {
    return this.http.get<EpisodeEntity>(this.url + id);
  }

  getEpisodesByIds(ids: string[]): Observable<EpisodeEntity[]> {
    return this.http.get<EpisodeEntity[]>(this.url + ids.toString());
  }
}
