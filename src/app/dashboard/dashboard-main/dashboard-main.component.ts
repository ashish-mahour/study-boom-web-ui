import { Component, OnInit } from '@angular/core';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  constructor(
    private titleService: Title,
    private loadingService: LoadingAnimServiceService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Dashboard - StudyBoom")
  }

}
