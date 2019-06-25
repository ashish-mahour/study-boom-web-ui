import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-test-series',
  templateUrl: './upload-test-series.component.html',
  styleUrls: ['./upload-test-series.component.scss']
})
export class UploadTestSeriesComponent implements OnInit {

  userType: string = 'PUBLISHER';

  constructor() { }

  ngOnInit() {
  }

}
