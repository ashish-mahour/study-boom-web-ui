import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestSeriesComponent } from './add-test-series.component';

describe('AddTestSeriesComponent', () => {
  let component: AddTestSeriesComponent;
  let fixture: ComponentFixture<AddTestSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
