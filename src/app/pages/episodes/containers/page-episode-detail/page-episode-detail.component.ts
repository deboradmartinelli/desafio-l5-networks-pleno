import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodeEntity } from '../../models/episodes.interface';
import { CharactersService } from '../../../characters/services/characters.service';
import { CharacterEntity } from '../../../characters/models/character.interface';
import { CharacterCardComponent } from '../../../characters/components/character-card/character-card.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-page-episode-detail',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CharacterCardComponent,
    LoaderComponent,
  ],
  templateUrl: './page-episode-detail.component.html',
  styleUrls: ['./page-episode-detail.component.scss'],
})
export class PageEpisodeDetailComponent implements OnInit {
  private readonly episodesService = inject(EpisodesService);
  private readonly charactersService = inject(CharactersService);
  @Input() id: string = '';
  episode: EpisodeEntity;
  charactersList: CharacterEntity[] = [];
  loading: boolean = false;
  loadingCharacters: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.getEpisodeDetail();
  }

  getEpisodeDetail() {
    this.loading = true;
    this.episodesService.getEpisodeById(this.id).subscribe((res) => {
      this.loading = false;
      this.episode = res;
      this.getCharacterEpisodes();
    });
  }

  getCharacterEpisodes() {
    if (!this.episode.characters.length) return;
    this.loadingCharacters = true;
    const characterIDs: Array<string> = this.episode.characters.map(
      (characterURL) => {
        const urlParts = characterURL.split('/');
        return urlParts[urlParts.length - 1];
      }
    );

    if (characterIDs.length === 1) {
      this.charactersService
        .getCharacterById(characterIDs.toString())
        .subscribe((res) => {
          this.charactersList = [res];
          this.loadingCharacters = false;
        });
    } else {
      this.charactersService
        .getCharactersByIds(characterIDs)
        .subscribe((res) => {
          this.charactersList = res;
          this.loadingCharacters = false;
        });
    }
  }
}
