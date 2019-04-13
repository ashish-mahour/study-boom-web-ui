import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherMoreDetailsComponent } from './publisher-more-details.component';

describe('PublisherMoreDetailsComponent', () => {
  let component: PublisherMoreDetailsComponent;
  let fixture: ComponentFixture<PublisherMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
