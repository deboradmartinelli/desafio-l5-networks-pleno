import { Route } from '@angular/router';
import { PageEpisodesComponent } from './containers/page-episodes/page-episodes.component';
import { PageEpisodeDetailComponent } from './containers/page-episode-detail/page-episode-detail.component';

export const EPISODES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => PageEpisodesComponent,
  },
  {
    path: ':id',
    loadComponent: () => PageEpisodeDetailComponent,
  },
];
