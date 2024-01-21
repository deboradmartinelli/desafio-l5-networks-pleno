import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchService } from '../../../../services/search.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../../services/auth.service';
import { AccountService } from '../../../../../pages/account/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    SideMenuComponent,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchElem: ElementRef;
  private readonly search = inject(SearchService);
  private readonly auth = inject(AuthService);
  private readonly account = inject(AccountService);
  private readonly router = inject(Router);
  searchValue;
  searchVisibility;

  mobileMenuOpenState: boolean = false;

  userPhoto;

  constructor() {}

  ngOnInit() {
    this.search.searchValue.subscribe((value) => {
      this.searchValue = value;
    });
    this.search.visibility.subscribe((value) => {
      this.searchVisibility = value;
    });

    this.account.currentUser$.subscribe((value) => {
      this.userPhoto = '../../../../../../assets/imgs/' + value.avatar;
    });
  }

  ngAfterViewInit() {
    fromEvent(this.searchElem.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.searchHandler();
      });
  }

  searchHandler() {
    this.search.setSearchValue(this.searchValue);
  }

  clearSearch() {
    this.searchValue = '';
    this.searchHandler();
  }

  sideMenuHandler() {
    this.mobileMenuOpenState = !this.mobileMenuOpenState;
  }

  viewMyAccount() {
    this.router.navigateByUrl('minha-conta');
  }

  logout() {
    this.auth.logout();
  }
}
