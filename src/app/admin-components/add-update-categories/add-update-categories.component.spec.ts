import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCategoriesComponent } from './add-update-categories.component';

describe('AddUpdateCategoriesComponent', () => {
  let component: AddUpdateCategoriesComponent;
  let fixture: ComponentFixture<AddUpdateCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
