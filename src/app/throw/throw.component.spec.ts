import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrowComponent } from './throw.component';

describe('ThrowComponent', () => {
  let component: ThrowComponent;
  let fixture: ComponentFixture<ThrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
