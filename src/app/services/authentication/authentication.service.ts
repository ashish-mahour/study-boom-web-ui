import { Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoadingAnimServiceService } from "../../shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "../../shared/config.json";
import { Router } from "@angular/router";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { UserDetails, Users, Login, ChangePassword } from '../../shared/interfaces/users.interfaces';
import { SubjectCategory } from '../../shared/interfaces/category.interface';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  isAuthenticated: boolean = false;
  userType: string;
  profileCompletion: number = 30;
  userDetails: Users = {
    id: null,
    fullName: null,
    username: null,
    email: null,
    password: null,
    type: null,
    profilePic: null,
    isActivated: null,
    userIdFromAdmin: null,
    userIdFromStudent: null,
    userIdFromPublisher: null
  };
  mofifiedUserDetails: UserDetails = {
    id: null,
    fullName: null,
    username: null,
    email: null,
    password: null,
    type: null,
    profilePic: null,
    mobileNo: null,
    bankName: null,
    branchName: null,
    accountNo: null,
    ifscCode: null,
    isActivated: null,
    choosedCategories: [],
    choosedSubCategories: []
  };
  allCategories: Array<SubjectCategory> = [];
  allUsers: Array<Users> = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  loginUser(loginDetails: Login): void {
    this.loadingService.showLoading(true, "Logging in...");
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
        (data: Users) => {
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
          this.loadingService.showLoading(false, null);
        },
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
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
    this.loadingService.showLoading(true, "Logout...");
    this.router.navigateByUrl("/home");
    this.isAuthenticated = false;
    this.userDetails = undefined;
    this.userType = undefined;
    localStorage.clear();
    this.loadingService.showLoading(false, null);
  }

  async modifyUsers(command: number) {
    this.loadingService.showLoading(true, "Modifing " + this.mofifiedUserDetails.type + "...");
    this.http
      .post(
        config.serverUrl + config.api.authentication + "/modify/account",
        this.mofifiedUserDetails
      )
      .toPromise()
      .then((_data: any) => {
        this.loadingService.showLoading(false, null);
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
        this.loadingService.showLoading(false, null);
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
    this.loadingService.showLoading(true, "Getting categories...");
    this.http
      .get(config.serverUrl + config.api.authentication + "/get/subject/categories")
      .subscribe(
        (data: Array<SubjectCategory>) => {
          this.loadingService.showLoading(false, null);
          this.allCategories = data;
        },
        (error: any) => {
          this.loadingService.showLoading(false, null);
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
    this.loadingService.showLoading(true, "Getting user...");
    this.http
      .get(
        config.serverUrl +
        config.api.authentication +
        "/get/user/" + id
      )
      .subscribe(
        (data: Users) => {
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
          this.loadingService.showLoading(false, null);
        },
        (error: any) => {
          this.loadingService.showLoading(false, null);
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
  changePassword(changePasswordForm: ChangePassword) {
    this.loadingService.showLoading(true, "Changing Password...");
    this.http.post(config.serverUrl + config.api.authentication + "/change/password", changePasswordForm).subscribe(_success => {
      this.loadingService.showLoading(false, null);
      this.dialog.open(AlertBoxComponent, {
        minWidth: "25%",
        maxWidth: "60%",
        data: {
          type: "success",
          message: "Password Successfully Changed!!"
        }
      });
    }, error => {

      this.loadingService.showLoading(false, null);
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
