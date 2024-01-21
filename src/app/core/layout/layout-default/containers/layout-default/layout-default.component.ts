import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AccountService } from '../../../../../pages/account/services/account.service';

@Component({
  selector: 'app-layout-default',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent, HeaderComponent],
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit {
  private readonly account = inject(AccountService);

  constructor() {}

  ngOnInit() {
    if (!this.account.currentUser$.getValue()) {
      this.account.getUserData().subscribe();
    }
  }
}
