import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSeriesListingComponent } from './test-series-listing.component';

describe('TestSeriesListingComponent', () => {
  let component: TestSeriesListingComponent;
  let fixture: ComponentFixture<TestSeriesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSeriesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSeriesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
