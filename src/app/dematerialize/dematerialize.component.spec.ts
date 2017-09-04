import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DematerializeComponent } from './dematerialize.component';

describe('DematerializeComponent', () => {
  let component: DematerializeComponent;
  let fixture: ComponentFixture<DematerializeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DematerializeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DematerializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
