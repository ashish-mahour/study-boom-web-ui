import { LoadingAnimServiceService } from './../shared/loading/loading-anim-service.service';
import { Component, OnInit, NgZone, HostListener } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { routerInAnimation } from '../shared/animations';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerInAnimation]
})
export class HomeComponent implements OnInit {


  loading: boolean = false;
  height: number = window.innerHeight - 40

  constructor(
    private titleService: Title,
    public loadingService: LoadingAnimServiceService,
    private authenticationService: AuthenticationService,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle("Home - StudyBoom")
    this.authenticationService.logoutUser()
  }

  @HostListener("window:resize")
  onResize() {
    this.zone.run(() => {
      this.height = window.innerHeight - 40
    })
  }

}
