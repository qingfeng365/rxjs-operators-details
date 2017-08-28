import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCountComponent } from './window-count.component';

describe('WindowCountComponent', () => {
  let component: WindowCountComponent;
  let fixture: ComponentFixture<WindowCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
