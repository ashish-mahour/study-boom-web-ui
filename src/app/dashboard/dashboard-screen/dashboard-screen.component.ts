import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.scss']
})
export class DashboardScreenComponent implements OnInit {

  userType: string = 'PUBLISHER';
  profileCompletion: number = 90;
  constructor() { }

  ngOnInit() {
  }

}
