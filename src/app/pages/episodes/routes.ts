import { Route } from '@angular/router';
import { PageEpisodesComponent } from './containers/page-episodes/page-episodes.component';

export const EPISODES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => PageEpisodesComponent,
  },
];
