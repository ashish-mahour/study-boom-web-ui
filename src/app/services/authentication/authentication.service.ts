import { Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "src/app/shared/config.json";
import { Router } from "@angular/router";
import { AlertBoxComponent } from "src/app/shared/alert-box/alert-box.component";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  isAuthenticated: boolean = false;
  userType: string;
  profileCompletion: number = 30;
  userDetails: any = {};
  mofifiedUserDetails: any = {};

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {}

  loginUser(loginDetails: any): void {
    this.loadingService.showLoading(true);
    loginDetails.password = btoa(loginDetails.password);
    this.http
      .get(
        config.serverUrl +
          config.api.authentication +
          "/perform/login" +
          "?username=" +
          loginDetails.username +
          "&password=" +
          loginDetails.password
      )
      .subscribe(
        (data: any) => {
          /**
           * SAVE DATA
           */
          delete data.password;
          this.userDetails = data;
          this.userType = data.type;
          this.profileCompletion = 100;
          this.isAuthenticated = true;

          /**
           * SAVE THEM IN LOCAL STORAGE
           */

          localStorage.setItem("userDetails", JSON.stringify(this.userDetails));
          localStorage.setItem(
            "isAuthenticated",
            this.isAuthenticated ? "true" : "false"
          );
          localStorage.setItem("userType", this.userType);

          this.router.navigateByUrl("/dashboard");
          this.loadingService.showLoading(false);
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Incorrect Username or Password!!"
            }
          });
        }
      );
  }
  logoutUser() {
    this.loadingService.showLoading(true);
    this.router.navigateByUrl("/home");
    this.isAuthenticated = false;
    this.userDetails = undefined;
    this.userType = undefined;
    localStorage.clear();
    this.loadingService.showLoading(false);
  }

  modifyUsers(command: number) {
    this.loadingService.showLoading(true);
    this.http
      .post(
        config.serverUrl + config.api.authentication + "/modify/account",
        this.mofifiedUserDetails
      )
      .toPromise()
      .then((data: any) => {
        this.loadingService.showLoading(false);
        let message: string;
        if (command === config.modifiedCommands.changeProfilePic) {
          this.userDetails.profilePic = this.mofifiedUserDetails.profilePic;
          message = "Profile Pic Successfully changed!!";
        } else if (command === config.modifiedCommands.updateStudent) {
          this.userDetails.fullName = this.mofifiedUserDetails.fullName;
          this.userDetails.username = this.mofifiedUserDetails.username;
          this.userDetails.email = this.mofifiedUserDetails.email;
          this.userDetails.mobileNo = this.mofifiedUserDetails.mobileNo;
          message = "Student Details Updated!!";
        } else if (command === config.modifiedCommands.updatePublisher) {
          this.userDetails.fullName = this.mofifiedUserDetails.fullName;
          this.userDetails.username = this.mofifiedUserDetails.username;
          this.userDetails.email = this.mofifiedUserDetails.email;
          this.userDetails.mobileNo = this.mofifiedUserDetails.mobileNo;
          message = "Publisher Details Updated!!";
        } else if (command === config.modifiedCommands.updateAdmin) {
          this.userDetails.fullName = this.mofifiedUserDetails.fullName;
          this.userDetails.username = this.mofifiedUserDetails.username;
          this.userDetails.email = this.mofifiedUserDetails.email;
          message = "Admin Details Updated!!";
        } else if (command === config.modifiedCommands.addPublisherDetail) {
          message = "Publisher Details Added!!";
        }

        
        /**
         * SAVE THEM IN LOCAL STORAGE
         */

        localStorage.setItem("userDetails", JSON.stringify(this.userDetails));
        localStorage.setItem(
          "isAuthenticated",
          this.isAuthenticated ? "true" : "false"
        );
        localStorage.setItem("userType", this.userType);

        const alertBox = this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: message
          }
        });
      })
      .catch((error: any) => {
        console.log(error)
        this.loadingService.showLoading(false);
        let message: string;
        if (command === config.modifiedCommands.changeProfilePic)
          message = "Unable to change profile pic!!";
        const alertBox = this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "error",
            message: message
          }
        });
      });
  }
}
