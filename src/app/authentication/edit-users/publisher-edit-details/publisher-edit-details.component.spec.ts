import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherEditDetailsComponent } from './publisher-edit-details.component';

describe('PublisherEditDetailsComponent', () => {
  let component: PublisherEditDetailsComponent;
  let fixture: ComponentFixture<PublisherEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
