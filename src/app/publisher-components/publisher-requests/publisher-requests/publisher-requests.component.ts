import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-publisher-requests',
  templateUrl: './publisher-requests.component.html',
  styleUrls: ['./publisher-requests.component.scss']
})
export class PublisherRequestsComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
