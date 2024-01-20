import { Component, OnInit, inject } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { CharactersApiResponse } from '../../../characters/models/character.interface';
import {
  EpisodeApiResponse,
  EpisodeEntity,
  Info,
} from '../../models/episodes.interface';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-page-episodes',
  standalone: true,
  imports: [EpisodeCardComponent, RouterModule, LoaderComponent],
  templateUrl: './page-episodes.component.html',
  styleUrls: ['./page-episodes.component.scss'],
})
export class PageEpisodesComponent implements OnInit {
  private readonly search = inject(SearchService);
  private readonly episodesService = inject(EpisodesService);

  searchValue;

  loading: boolean = false;

  episodesList: EpisodeEntity[] = [];
  episodeInfo: Info;
  nextUrl: string;

  constructor() {}

  ngOnInit() {
    this.search.searchValue.subscribe((value) => {
      this.searchValue = value;
      this.getAllEpisodes();
    });
  }

  getAllEpisodes() {
    this.loading = true;
    this.episodesService
      .getAllEpisodes(this.searchValue)
      .subscribe((res: EpisodeApiResponse) => {
        this.episodesList = res.results;
        this.episodeInfo = res.info;
        this.nextUrl = res.info.next;
        this.loading = false;
      });
  }
}
