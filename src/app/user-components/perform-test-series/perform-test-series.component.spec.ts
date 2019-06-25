import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformTestSeriesComponent } from './perform-test-series.component';

describe('PerformTestSeriesComponent', () => {
  let component: PerformTestSeriesComponent;
  let fixture: ComponentFixture<PerformTestSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformTestSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformTestSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
