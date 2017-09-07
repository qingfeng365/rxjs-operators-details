import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticastComponent } from './multicast.component';

describe('MulticastComponent', () => {
  let component: MulticastComponent;
  let fixture: ComponentFixture<MulticastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
