import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CharacterEntity } from '../../models/character.interface';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: CharacterEntity;

  constructor() {}

  ngOnInit() {}
}
