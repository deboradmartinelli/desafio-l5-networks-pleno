import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public currentUser$ = new BehaviorSubject(null);

  constructor() {}

  getUserData(userId?: string) {
    if (!userId) userId = localStorage.getItem('user');

    const userFakeApiReturn = {
      firstName: 'Débora',
      lastName: 'do Monte Martinelli',
      email: 'demontemartinelli@gmail.com',
      jobTitle: 'Desenvolvedora Angular',
      avatar: 'selfie.jpg',
      about: `<p>Desenvolvedora Front-end.</p>
<p>Em processo de transição de carreira, já fui de Coordenadora de Padaria a dona do meu próprio negócio, há alguns anos me apaixonei por TI e desde então sigo estudando Front-end.</p>
<p>Tecnologias: <br/>
Front-end: Angular, Rxjs, NgRx, JavaScript (Typescript, ES6+, jQuery), CSS3 (SCSS, BEM), Jasmine, PWAs, noções em UI/UX. <br/>
Back-end: Conhecimentos em Spring Boot, MySQL, MongoDB, Docker, REST, Clean-architecture, SOLID, DDD. <br/>
Devops: GitLab, Jenkins, Sonar Qube, Fortify, Azure, Aws.</p>`,
      linkedId: 'https://www.linkedin.com/in/deboramonte/',
    };

    return of(userFakeApiReturn).pipe(
      tap((user) => {
        this.currentUser$.next(user);
      })
    );
  }

  clearUserData() {
    this.currentUser$.next(null);
  }
}
