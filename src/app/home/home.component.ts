import { LoadingAnimServiceService } from '../shared/loading/loading-anim-service.service';
import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  loading: boolean = false;

  isNotBigScreen: boolean = false;

  constructor(
    private title: Title,
    private loadingService: LoadingAnimServiceService) {
    title.setTitle("Home - StudyBoom")
  }



  ngOnInit() {
    if (navigator.userAgent.match(/Android|iPhone|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i))
      this.isNotBigScreen = true
  }

}
