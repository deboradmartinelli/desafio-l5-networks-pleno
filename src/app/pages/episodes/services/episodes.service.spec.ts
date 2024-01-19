/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpisodesService } from './episodes.service';

describe('Service: Episodes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpisodesService]
    });
  });

  it('should ...', inject([EpisodesService], (service: EpisodesService) => {
    expect(service).toBeTruthy();
  }));
});
