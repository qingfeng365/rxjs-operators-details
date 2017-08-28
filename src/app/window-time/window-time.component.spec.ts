import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTimeComponent } from './window-time.component';

describe('WindowTimeComponent', () => {
  let component: WindowTimeComponent;
  let fixture: ComponentFixture<WindowTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
