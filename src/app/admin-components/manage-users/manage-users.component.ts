import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AdminService } from "src/app/services/admin/admin.service";
import * as config from "src/app/shared/config.json";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"]
})
export class ManageUsersComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";
  currentPage: number = 0;
  pageNo: number = 0;
  limit: number = 20;

  constructor(
    private authenticationService: AuthenticationService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.allUsers = [];
    this.adminService.getAllUsers(this.pageNo, this.limit);
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  nextPage() {
    this.currentPage += 1;
    if (this.adminService.allUsers[this.pageNo + 1]) {
      this.pageNo += 1;
      this.adminService.getAllUsers(this.pageNo, this.limit);
    }
  }

  prevPage() {
    this.currentPage -= 1;
  }

  userStatusChanged(user: any) {
    this.authenticationService.mofifiedUserDetails.type = user.type;
    this.authenticationService.mofifiedUserDetails.id = user.id;
    this.authenticationService.mofifiedUserDetails.isActivated =
      user.isActivated;
    this.authenticationService.modifyUsers(
      config.modifiedCommands.changeUserStatus
    );
  }
}
