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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchElem: ElementRef;
  private readonly search = inject(SearchService);

  searchValue;

  constructor() {}

  ngOnInit() {
    this.search.searchValue.subscribe((value) => {
      this.searchValue = value;
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
    this.search.searchValue.next(this.searchValue);
  }
}
