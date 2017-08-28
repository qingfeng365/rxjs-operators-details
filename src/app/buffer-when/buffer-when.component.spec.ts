import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferWhenComponent } from './buffer-when.component';

describe('BufferWhenComponent', () => {
  let component: BufferWhenComponent;
  let fixture: ComponentFixture<BufferWhenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BufferWhenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BufferWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
