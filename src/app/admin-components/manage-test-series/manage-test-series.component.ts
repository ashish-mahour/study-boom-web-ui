import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: "app-manage-test-series",
  templateUrl: "./manage-test-series.component.html",
  styleUrls: ["./manage-test-series.component.scss"]
})
export class ManageTestSeriesComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }
}
