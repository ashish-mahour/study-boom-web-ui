import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perform-test-series',
  templateUrl: './perform-test-series.component.html',
  styleUrls: ['./perform-test-series.component.scss']
})
export class PerformTestSeriesComponent implements OnInit {

  userType: string = 'STUDENT';

  constructor() { }

  ngOnInit() {
  }

}
