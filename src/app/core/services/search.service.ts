import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchValue = new BehaviorSubject<string>('');
  visibility = new BehaviorSubject<boolean>(false);

  constructor() {}

  public setVisibility(value) {
    this.visibility.next(value);
  }

  public setSearchValue(value) {
    this.searchValue.next(value);
  }
}
