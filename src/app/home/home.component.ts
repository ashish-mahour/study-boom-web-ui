import { LoadingAnimServiceService } from './../shared/loading/loading-anim-service.service';
import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  loading: boolean = false;

  constructor(
    private titleService: Title,
    private loadingService: LoadingAnimServiceService) {
  }



  ngOnInit() {

    this.titleService.setTitle("Home - StudyBoom")

  }

}
