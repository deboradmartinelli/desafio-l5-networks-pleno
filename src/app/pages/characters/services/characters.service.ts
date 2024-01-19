import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  getAllCharacters(): Observable<CharactersApiResponse> {
    return this.http.get<CharactersApiResponse>(this.url);
  }

  getCharacterById(id: string): Observable<CharacterEntity> {
    return this.http.get<CharacterEntity>(this.url + id);
  }
}
