import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatMapToComponent } from './concat-map-to.component';

describe('ConcatMapToComponent', () => {
  let component: ConcatMapToComponent;
  let fixture: ComponentFixture<ConcatMapToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcatMapToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcatMapToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
