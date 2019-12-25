import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRequestsComponent } from './add-update-requests.component';

describe('AddUpdateRequestsComponent', () => {
  let component: AddUpdateRequestsComponent;
  let fixture: ComponentFixture<AddUpdateRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
