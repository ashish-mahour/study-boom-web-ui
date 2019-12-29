import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-publisher-requests',
  templateUrl: './publisher-requests.component.html',
  styleUrls: ['./publisher-requests.component.scss']
})
export class PublisherRequestsComponent implements OnInit {

  height: string = window.innerHeight - 250 + "px";
  
  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }
}
