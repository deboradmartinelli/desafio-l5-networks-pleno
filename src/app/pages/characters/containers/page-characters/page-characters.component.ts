import { Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import {
  CharacterEntity,
  CharactersApiResponse,
} from '../../models/character.interface';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-page-characters',
  standalone: true,
  imports: [
    CharacterCardComponent,
    RouterModule,
    CommonModule,
    InfiniteScrollModule,
  ],
  templateUrl: './page-characters.component.html',
  styleUrls: ['./page-characters.component.scss'],
})
export class PageCharactersComponent implements OnInit {
  private readonly charactersService = inject(CharactersService);
  private readonly router = inject(Router);
  charactersList: CharacterEntity[];
  nextUrl: string = '';
  constructor() {}

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.charactersService
      .getAllCharacters()
      .subscribe((res: CharactersApiResponse) => {
        this.charactersList = res.results;
        this.nextUrl = res.info.next;
      });
  }

  viewCharacterDetail(id) {
    this.router.navigateByUrl('personagens/' + id);
  }

  onScroll() {
    this.charactersService.getAllCharacters().subscribe({
      next: (res) => {
        if (res.info.next && res.info.next === null) {
          this.nextUrl = res.info.next;
          Array.from(res.results).forEach((element) => {
            this.charactersList = [...this.charactersList, element];
          });
        }
      },
    });
  }

  onScrollUp() {
    alert('Voce esta no inicio');
  }
  trackByCharaterId: TrackByFunction<any> = (index: number, character: any) =>
    character.id;
}
