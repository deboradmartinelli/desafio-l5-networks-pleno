import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  CharacterEntity,
  CharactersApiResponse,
} from '../models/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  url = 'https://rickandmortyapi.com/api/character/';
  constructor() {}

  getAllCharacters(nameFilter?): Observable<CharactersApiResponse> {
    let params = new HttpParams();
    if (nameFilter) {
      params = params.append('name', nameFilter);
    } else {
      params = null;
    }

    return this.http
      .get<CharactersApiResponse>(this.url, { params: params })
      .pipe(
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

  getNextPage(url): Observable<CharactersApiResponse> {
    return this.http.get<CharactersApiResponse>(url);
  }

  getCharacterById(id: string): Observable<CharacterEntity> {
    return this.http.get<CharacterEntity>(this.url + id);
  }

  getCharactersByIds(ids: string[]): Observable<CharacterEntity[]> {
    return this.http.get<CharacterEntity[]>(this.url + ids.toString());
  }
}
