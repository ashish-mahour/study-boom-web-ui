import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-perform-test-series',
  templateUrl: './perform-test-series.component.html',
  styleUrls: ['./perform-test-series.component.scss']
})
export class PerformTestSeriesComponent implements OnInit {

  userType: string = 'STUDENT';

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Performing Test - StudyBoom")
  }

}
