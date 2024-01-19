import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnInit {
  @Input() episode: any;
  constructor() {}

  ngOnInit() {}
}
