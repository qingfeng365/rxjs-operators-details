import { TestBed, inject } from '@angular/core/testing';

import { DateToolService } from './date-tool.service';

describe('DateToolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateToolService]
    });
  });

  it('should be created', inject([DateToolService], (service: DateToolService) => {
    expect(service).toBeTruthy();
  }));
});
