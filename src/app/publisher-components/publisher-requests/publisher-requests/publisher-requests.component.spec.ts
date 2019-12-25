import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherRequestsComponent } from './publisher-requests.component';

describe('PublisherRequestsComponent', () => {
  let component: PublisherRequestsComponent;
  let fixture: ComponentFixture<PublisherRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
