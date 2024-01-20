import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnInit {
  private readonly router = inject(Router);
  @Input() episode: any;
  constructor() {}

  ngOnInit() {}

  viewEpisodeDetail(id) {
    this.router.navigateByUrl('episodios/' + id);
  }
}
