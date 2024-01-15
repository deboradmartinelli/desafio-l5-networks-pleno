import { Route } from '@angular/router';
import { PageCharactersComponent } from './containers/page-characters/page-characters.component';

export const CHARACTERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => PageCharactersComponent,
  },
];
