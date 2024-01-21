import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AccountService } from '../../pages/account/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  public login(userLogin) {
    const loginFakeApiReturn = {
      access_token: 'jwt',
      userId: 'debora',
    };

    return of(loginFakeApiReturn).pipe(
      tap((userAuth) => {
        localStorage.setItem('access_token', userAuth.access_token);
        localStorage.setItem('user', userAuth.userId);
        this.loggedIn.next(true);
      }),
      mergeMap((userAuth) => {
        return this.accountService.getUserData(userAuth.userId);
      }),
      tap(() => {
        this.router.navigateByUrl('/personagens');
      })
    );
  }

  public isAuthenticated(): boolean {
    let token: string | null | undefined = localStorage.getItem('access_token');
    token ? this.loggedIn.next(true) : this.loggedIn.next(false);
    return this.loggedIn.getValue();
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.accountService.clearUserData();
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }
}
