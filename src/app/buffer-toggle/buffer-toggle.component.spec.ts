import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferToggleComponent } from './buffer-toggle.component';

describe('BufferToggleComponent', () => {
  let component: BufferToggleComponent;
  let fixture: ComponentFixture<BufferToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BufferToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BufferToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
