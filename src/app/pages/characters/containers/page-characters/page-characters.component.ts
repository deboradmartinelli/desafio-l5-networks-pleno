import { Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import {
  CharacterEntity,
  CharactersApiResponse,
  Info,
} from '../../models/character.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchService } from '../../../../core/services/search.service';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-page-characters',
  standalone: true,
  imports: [
    CharacterCardComponent,
    RouterModule,
    CommonModule,
    InfiniteScrollModule,
    LoaderComponent,
  ],
  templateUrl: './page-characters.component.html',
  styleUrls: ['./page-characters.component.scss'],
})
export class PageCharactersComponent implements OnInit {
  private readonly search = inject(SearchService);
  private readonly charactersService = inject(CharactersService);

  searchValue;

  loading: boolean = false;

  charactersList: CharacterEntity[] = [];
  characterInfo: Info;
  constructor() {}

  ngOnInit(): void {
    this.search.setVisibility(true);
    this.search.searchValue.subscribe((value) => {
      this.searchValue = value;
      this.getAllCharacters();
    });
  }

  ngOnDestroy() {
    this.search.setVisibility(false);
  }

  getAllCharacters() {
    this.loading = true;
    this.charactersService
      .getAllCharacters(this.searchValue)
      .subscribe((res: CharactersApiResponse) => {
        this.charactersList = res.results;
        this.characterInfo = res.info;
        this.loading = false;
      });
  }

  onScroll() {
    if (!this.characterInfo.next) return;
    this.charactersService
      .getNextPage(this.characterInfo.next)
      .subscribe((res) => {
        this.characterInfo = res.info;
        this.charactersList.push(...res.results);
      });
  }
}
