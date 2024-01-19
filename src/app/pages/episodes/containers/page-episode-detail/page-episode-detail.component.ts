import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodeEntity } from '../../models/episodes.interface';

@Component({
  selector: 'app-page-episode-detail',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './page-episode-detail.component.html',
  styleUrls: ['./page-episode-detail.component.scss'],
})
export class PageEpisodeDetailComponent implements OnInit {
  private readonly episodesService = inject(EpisodesService);
  @Input() id: string = '';
  episode: EpisodeEntity;

  constructor() {}

  ngOnInit(): void {
    this.episodesService.getEpisodeById(this.id).subscribe((res) => {
      this.episode = res;
    });
  }
}
