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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-page-episodes',
  standalone: true,
  imports: [
    EpisodeCardComponent,
    RouterModule,
    InfiniteScrollModule,
    LoaderComponent,
  ],
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

  constructor() {}

  ngOnInit() {
    this.search.setVisibility(true);
    this.search.searchValue.subscribe((value) => {
      this.searchValue = value;
      this.getAllEpisodes();
    });
  }

  ngOnDestroy() {
    this.search.setVisibility(false);
  }

  getAllEpisodes() {
    this.loading = true;
    this.episodesService
      .getAllEpisodes(this.searchValue)
      .subscribe((res: EpisodeApiResponse) => {
        this.episodesList = res.results;
        this.episodeInfo = res.info;
        this.loading = false;
      });
  }

  onScroll() {
    if (!this.episodeInfo.next) return;
    this.episodesService.getNextPage(this.episodeInfo.next).subscribe((res) => {
      this.episodeInfo = res.info;
      this.episodesList.push(...res.results);
    });
  }
}
