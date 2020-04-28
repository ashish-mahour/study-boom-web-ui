import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { AdminService } from "../../services/admin/admin.service";
import { Requests, RequestDetails } from 'src/app/shared/interfaces/requests.interface';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { UserService } from 'src/app/services/user/user.service';
import { Chart } from "chart.js";

@Component({
  selector: "app-dashboard-screen",
  templateUrl: "./dashboard-screen.component.html",
  styleUrls: ["./dashboard-screen.component.scss"]
})
export class DashboardScreenComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";
  currentRequestPage: number = 0;
  requestPageNo: number = 0;
  requestLimit: number = 20;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public adminService: AdminService,
    public publisherService: PublisherService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.translate
      .get(["userTypes.admin", "userTypes.student", "userTypes.publisher"])
      .subscribe((translations) => {
        if (this.authenticationService.userType === translations["userTypes.admin"]) {
          this.adminService.allRequests = []
          this.adminService.getAllRequests({
            pageNo: this.requestPageNo,
            limit: this.requestLimit
          });
        } else if (this.authenticationService.userType === translations["userTypes.student"]) {
          this.userService.getDashboardReports()
          this.generateUserDashboard()
        } else if (this.authenticationService.userType === translations["userTypes.publisher"]) {
          this.publisherService.getDashboardReports()
          this.generatePublisherDashboard()
        }
      });
  }

  generatePublisherDashboard() {
    console.log(this.publisherService.dashboardReports)
  }

  generateUserDashboard() {
    console.log(this.userService.dashboardReports)
  }

  editProfile() {
    this.translate
      .get(["userTypes.admin", "userTypes.student", "userTypes.publisher"])
      .subscribe((translations) => {
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
    if (this.adminService.allUsers[this.requestPageNo + 1]) {
      this.requestPageNo += 1;
      this.adminService.getAllUsers({ pageNo: this.requestPageNo, limit: this.requestLimit });
    }
  }

  prevAdminRequestPage() {
    this.currentRequestPage -= 1;
  }

  changeStatus(status: "NOT_STARTED" | "ACCEPTED" | "NOT_ACCEPTED", request: Requests) {
    const requestDetails: RequestDetails = {
      userId: request.userIdToRequests.id,
      requestId: request.id,
      requestText: request.requestText,
      processed: true,
      status: status
    }
    this.requestPageNo = 0;
    this.adminService.modifyRequest(requestDetails);
  }
}
