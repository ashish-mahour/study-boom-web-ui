import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRatingsComponent } from './submit-ratings.component';

describe('SubmitRatingsComponent', () => {
  let component: SubmitRatingsComponent;
  let fixture: ComponentFixture<SubmitRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
