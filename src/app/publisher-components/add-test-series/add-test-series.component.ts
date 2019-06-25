import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-test-series',
  templateUrl: './add-test-series.component.html',
  styleUrls: ['./add-test-series.component.scss']
})
export class AddTestSeriesComponent implements OnInit {

  userType: string = 'PUBLISHER';

  constructor() { }

  ngOnInit() {
  }

}
