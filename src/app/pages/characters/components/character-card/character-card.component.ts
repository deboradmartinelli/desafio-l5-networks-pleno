import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CharacterEntity } from '../../models/character.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  private readonly router = inject(Router);
  @Input() character: CharacterEntity;

  constructor() {}

  ngOnInit() {}

  viewCharacterDetail(id) {
    this.router.navigateByUrl('personagens/' + id);
  }
}
