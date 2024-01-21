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
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchElem: ElementRef;
  private readonly search = inject(SearchService);

  searchValue;
  searchVisibility;

  mobileMenuOpenState: boolean = false;

  constructor() {}

  ngOnInit() {
    this.search.searchValue.subscribe((value) => {
      this.searchValue = value;
    });
    this.search.visibility.subscribe((value) => {
      this.searchVisibility = value;
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
}
