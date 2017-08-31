import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfComponent } from './of.component';

describe('OfComponent', () => {
  let component: OfComponent;
  let fixture: ComponentFixture<OfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
