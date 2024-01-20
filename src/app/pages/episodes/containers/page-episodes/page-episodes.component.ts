import { Component, OnInit, inject } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-episodes',
  standalone: true,
  imports: [EpisodeCardComponent, RouterModule],
  templateUrl: './page-episodes.component.html',
  styleUrls: ['./page-episodes.component.scss'],
})
export class PageEpisodesComponent implements OnInit {
  private readonly episodesService = inject(EpisodesService);

  episodesList: any[];

  constructor() {}

  ngOnInit() {
    this.getAllEpisodes();
  }

  getAllEpisodes() {
    this.episodesService.getAllEpisodes().subscribe((res: any) => {
      this.episodesList = res.results;
    });
  }
}
