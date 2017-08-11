import { TestBed, inject } from '@angular/core/testing';

import { DiffAnalysisService } from './diff-analysis.service';

describe('DiffAnalysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiffAnalysisService]
    });
  });

  it('should be created', inject([DiffAnalysisService], (service: DiffAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
