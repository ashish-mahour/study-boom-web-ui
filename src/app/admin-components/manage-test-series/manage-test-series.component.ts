import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-test-series',
  templateUrl: './manage-test-series.component.html',
  styleUrls: ['./manage-test-series.component.scss']
})
export class ManageTestSeriesComponent implements OnInit {

  userType: string = 'ADMIN';
  
  constructor() { }

  ngOnInit() {
  }

}
