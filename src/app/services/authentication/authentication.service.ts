import { Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoadingAnimServiceService } from "../../shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "../../shared/config.json";
import { Router } from "@angular/router";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
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
  allCategories: any[] = [];
  allUsers: any[] = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {

  }

  loginUser(loginDetails: any): void {
    this.loadingService.showLoading(true);
    this.http
      .get(
        config.serverUrl +
        config.api.authentication +
        "/perform/login" +
        "?username=" +
        loginDetails.username +
        "&password=" +
        btoa(loginDetails.password)
      )
      .subscribe(
        (data: any) => {
          /**
           * SAVE DATA
           */
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

          if (this.allCategories.length === 0)
            this.getAllCategories()

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
          message = "Student Details Updated!!";
        } else if (command === config.modifiedCommands.updatePublisher) {
          message = "Publisher Details Updated!!";
        } else if (command === config.modifiedCommands.updateAdmin) {
          message = "Admin Details Updated!!";
        } else if (command === config.modifiedCommands.addPublisherDetail) {
          message = "Publisher Details Added!!";
        } else if (command === config.modifiedCommands.changeUserStatus) {
          message = "Status Changed!!";
        }

        /**
         * Get User Again by ID
         */
        this.getUserById(this.userDetails.id)

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
        console.log(error);
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
  getAllCategories() {
    this.loadingService.showLoading(true);
    this.http
      .get(config.serverUrl + config.api.authentication + "/get/subject/categories")
      .subscribe(
        (data: any[]) => {
          this.loadingService.showLoading(false);
          this.allCategories = data;
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in getting categories!!"
            }
          });
        }
      );
  }

  getUserById(id: number) {
    this.loadingService.showLoading(true);
    this.http
      .get(
        config.serverUrl +
        config.api.authentication +
        "/get/user/" + id
      )
      .subscribe(
        (data: any) => {
          /**
           * SAVE DATA
           */
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
          this.loadingService.showLoading(false);
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error getting user details!!"
            }
          });
        }
      );
  }
  changePassword(changePasswordForm: any) {
    this.loadingService.showLoading(true);
    this.http.post(config.serverUrl + config.api.authentication + "/change/password", changePasswordForm).subscribe(_success => {
      this.loadingService.showLoading(false);
      this.dialog.open(AlertBoxComponent, {
        minWidth: "25%",
        maxWidth: "60%",
        data: {
          type: "success",
          message: "Password Successfully Changed!!"
        }
      });
    }, error => {
      
      this.loadingService.showLoading(false);
      this.dialog.open(AlertBoxComponent, {
        minWidth: "25%",
        maxWidth: "60%",
        data: {
          type: "error",
          message: error.error.message
        }
      });
    })
  }
}
