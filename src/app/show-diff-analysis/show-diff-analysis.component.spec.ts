import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiffAnalysisComponent } from './show-diff-analysis.component';

describe('ShowDiffAnalysisComponent', () => {
  let component: ShowDiffAnalysisComponent;
  let fixture: ComponentFixture<ShowDiffAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDiffAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDiffAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
