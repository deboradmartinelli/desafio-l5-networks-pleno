import { Route } from '@angular/router';
import { PageCharactersComponent } from './containers/page-characters/page-characters.component';
import { PageCharacterDetailComponent } from './containers/page-character-detail/page-character-detail.component';

export const CHARACTERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => PageCharactersComponent,
  },
  {
    path: ':id',
    loadComponent: () => PageCharacterDetailComponent,
  },
];
