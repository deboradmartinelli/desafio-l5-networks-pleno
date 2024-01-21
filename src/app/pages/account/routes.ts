import { Route } from '@angular/router';
import { PageMyAccountComponent } from './containers/page-my-account/page-my-account.component';

export const ACCOUNT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => PageMyAccountComponent,
  },
];
