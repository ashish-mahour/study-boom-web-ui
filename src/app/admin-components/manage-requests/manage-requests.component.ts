import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: "app-manage-requests",
  templateUrl: "./manage-requests.component.html",
  styleUrls: ["./manage-requests.component.scss"]
})
export class ManageRequestsComponent implements OnInit {
  
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}
}
