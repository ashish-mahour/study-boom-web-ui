import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-series-listing',
  templateUrl: './test-series-listing.component.html',
  styleUrls: ['./test-series-listing.component.scss']
})
export class TestSeriesListingComponent implements OnInit {

  userType: string = 'STUDENT';
  
  constructor() { }

  ngOnInit() {
  }

}
