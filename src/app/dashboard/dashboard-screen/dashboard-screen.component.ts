import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { AdminService } from "../../services/admin/admin.service";

@Component({
  selector: "app-dashboard-screen",
  templateUrl: "./dashboard-screen.component.html",
  styleUrls: ["./dashboard-screen.component.scss"]
})
export class DashboardScreenComponent implements OnInit {
  profileCompletion: number = 30;

  height: string = window.innerHeight - 250 + "px";
  currentRequestPage: number = 0;
  requestPageNo: number = 0;
  requestLimit: number = 20;
  testData: any[] = [];

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public adminService: AdminService
  ) {}

  ngOnInit() {
    this.translate
      .get(["userTypes.admin", "userTypes.student", "userTypes.publisher"])
      .subscribe((translations: any) => {
        if (
          this.authenticationService.userType ===
          translations["userTypes.admin"]
        )
          this.adminService.getAllRequests(
            this.requestPageNo,
            this.requestLimit
          );
      });
  }

  editProfile() {
    this.translate
      .get(["userTypes.admin", "userTypes.student", "userTypes.publisher"])
      .subscribe((translations: any) => {
        if (
          this.authenticationService.userType ===
          translations["userTypes.publisher"]
        )
          this.router.navigate([
            "/dashboard",
            { outlets: { "dashboard-page-router": ["publisher-edit-details"] } }
          ]);
        if (
          this.authenticationService.userType ===
          translations["userTypes.admin"]
        )
          this.router.navigate([
            "/dashboard",
            { outlets: { "dashboard-page-router": ["admin-edit-details"] } }
          ]);
        if (
          this.authenticationService.userType ===
          translations["userTypes.student"]
        )
          this.router.navigate([
            "/dashboard",
            { outlets: { "dashboard-page-router": "user-edit-details" } }
          ]);
      });
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  nextAdminRequestPage() {
    this.currentRequestPage += 1;
    if (this.adminService.allUsers[this.requestPageNo + 1]){
      this.requestPageNo += 1;
      this.adminService.getAllUsers(this.requestPageNo, this.requestLimit);
    }
  }

  prevAdminRequestPage() {
    this.currentRequestPage -= 1;
  }
}
