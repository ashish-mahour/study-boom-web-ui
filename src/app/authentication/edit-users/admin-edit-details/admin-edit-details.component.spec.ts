import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditDetailsComponent } from './admin-edit-details.component';

describe('AdminEditDetailsComponent', () => {
  let component: AdminEditDetailsComponent;
  let fixture: ComponentFixture<AdminEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
