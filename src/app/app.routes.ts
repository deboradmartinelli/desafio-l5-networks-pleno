import { Routes } from '@angular/router';
import { LayoutDefaultComponent } from './core/layout/layout-default/containers/layout-default/layout-default.component';
import { LayoutLoginComponent } from './core/layout/layout-login/layout-login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'personagens',
    pathMatch: 'full',
  },
  {
    path: 'personagens',
    component: LayoutDefaultComponent,
    canActivate: [authGuard()],
    loadChildren: () =>
      import('./pages/characters/routes').then((mod) => mod.CHARACTERS_ROUTES),
  },
  {
    path: 'episodios',
    canActivate: [authGuard()],
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./pages/episodes/routes').then((mod) => mod.EPISODES_ROUTES),
  },
  {
    path: 'minha-conta',
    canActivate: [authGuard()],
    component: LayoutDefaultComponent,
    loadChildren: () =>
      import('./pages/account/routes').then((mod) => mod.ACCOUNT_ROUTES),
  },
  {
    path: 'login',
    loadComponent: () => LayoutLoginComponent,
  },
];
