import { Routes } from '@angular/router';
import { LayoutDefaultComponent } from './core/layout/layout-default/containers/layout-default/layout-default.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'personagens',
    pathMatch: 'full',
  },
  {
    path: 'personagens',
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./pages/characters/routes').then((mod) => mod.CHARACTERS_ROUTES),
  },
  {
    path: 'episodios',
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./pages/episodes/routes').then((mod) => mod.EPISODES_ROUTES),
  },
];
