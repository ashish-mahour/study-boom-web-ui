import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"]
})
export class ManageUsersComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }
}
