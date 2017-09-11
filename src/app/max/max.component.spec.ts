import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxComponent } from './max.component';

describe('MaxComponent', () => {
  let component: MaxComponent;
  let fixture: ComponentFixture<MaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
