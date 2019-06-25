import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestSeriesComponent } from './manage-test-series.component';

describe('ManageTestSeriesComponent', () => {
  let component: ManageTestSeriesComponent;
  let fixture: ComponentFixture<ManageTestSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTestSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTestSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
