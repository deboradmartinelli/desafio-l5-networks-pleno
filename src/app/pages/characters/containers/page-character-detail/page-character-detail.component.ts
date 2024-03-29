import { Component, Input, OnInit, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharacterEntity } from '../../models/character.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EpisodesService } from '../../../episodes/services/episodes.service';
import { EpisodeCardComponent } from '../../../episodes/components/episode-card/episode-card.component';
import { EpisodeEntity } from '../../../episodes/models/episodes.interface';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { CharacterStatusComponent } from '../../components/character-status/character-status.component';

@Component({
  selector: 'app-page-character-detail',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    EpisodeCardComponent,
    LoaderComponent,
    CharacterStatusComponent,
  ],
  templateUrl: './page-character-detail.component.html',
  styleUrls: ['./page-character-detail.component.scss'],
})
export class PageCharacterDetailComponent implements OnInit {
  private readonly charactersService = inject(CharactersService);
  private readonly episodesService = inject(EpisodesService);
  @Input() id: string = '';
  character: CharacterEntity;
  episodesList: EpisodeEntity[] = [];
  loading: boolean = false;
  loadingEpisodes: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.getCharacterDetail();
  }

  getCharacterDetail() {
    this.loading = true;
    this.charactersService.getCharacterById(this.id).subscribe((res) => {
      this.loading = false;
      this.character = res;
      this.getCharacterEpisodes();
    });
  }

  getCharacterEpisodes() {
    if (!this.character.episode.length) return;
    this.loadingEpisodes = true;

    const episodesIDs: Array<string> = this.character.episode.map(
      (episodioURL) => {
        const urlParts = episodioURL.split('/');
        return urlParts[urlParts.length - 1];
      }
    );

    if (episodesIDs.length === 1) {
      this.episodesService
        .getEpisodeById(episodesIDs.toString())
        .subscribe((res) => {
          this.episodesList = [res];
          this.loadingEpisodes = false;
        });
    } else {
      this.episodesService.getEpisodesByIds(episodesIDs).subscribe((res) => {
        this.episodesList = res;
        this.loadingEpisodes = false;
      });
    }
  }
}
