import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTestSeriesComponent } from './upload-test-series.component';

describe('UploadTestSeriesComponent', () => {
  let component: UploadTestSeriesComponent;
  let fixture: ComponentFixture<UploadTestSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTestSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTestSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
