import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWithComponent } from './start-with.component';

describe('StartWithComponent', () => {
  let component: StartWithComponent;
  let fixture: ComponentFixture<StartWithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartWithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
