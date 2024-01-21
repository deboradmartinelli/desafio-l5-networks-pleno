import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-page-my-account',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './page-my-account.component.html',
  styleUrls: ['./page-my-account.component.scss'],
})
export class PageMyAccountComponent implements OnInit {
  private readonly account = inject(AccountService);

  user;

  constructor() {}

  ngOnInit() {
    this.account.currentUser$.subscribe((userData) => {
      this.user = userData;
    });
  }
}
