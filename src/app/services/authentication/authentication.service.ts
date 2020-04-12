import { Injectable, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoadingAnimServiceService } from "../../shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "../../shared/config.json";
import { Router } from "@angular/router";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { UserDetails, Users, Login, ChangePassword } from '../../shared/interfaces/users.interfaces';
import { SubjectCategory } from '../../shared/interfaces/category.interface';
import { Requests, RequestDetails } from '../../shared/interfaces/requests.interface';
import { RequestsStatus, AccountStatus } from '../../shared/interfaces/status.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  isAuthenticated: boolean = false;
  userType: string;
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
  allRequestsByUser: Array<Array<Requests>> = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
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
  getAllCategories(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.loadingService.showLoading(true, "Getting categories...");
      this.http
        .get(config.serverUrl + config.api.authentication + "/get/subject/categories")
        .subscribe(
          (data: Array<SubjectCategory>) => {
            this.loadingService.showLoading(false, null);
            this.allCategories = data;
            resolve(null)
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
            reject(null)
          }
        );
    })
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
    this.http.post(config.serverUrl + config.api.authentication + "/change/password", changePasswordForm).subscribe((data: AccountStatus) => {
      this.loadingService.showLoading(false, null);
      this.dialog.open(AlertBoxComponent, {
        minWidth: "25%",
        maxWidth: "60%",
        data: {
          type: "success",
          message: data.message
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
  getRequestsByUser(pageNo: number, limit: number) {
    this.loadingService.showLoading(true, "Getting Requests...");
    let apiToCall: string = config.serverUrl
    this.translate.get(["userTypes.student", "userTypes.publisher"]).subscribe(translations => {
      if (this.userDetails.type === translations["userTypes.student"]) {
        apiToCall += config.api.student + "/get/requests?userId=" + this.userDetails.id + "&pageNo=" + pageNo + "&limit=" + limit
      } else if (this.userDetails.type === translations["userTypes.publisher"]) {
        apiToCall += config.api.publisher + "/get/requests?userId=" + this.userDetails.id + "&pageNo=" + pageNo + "&limit=" + limit
      }
      this.http.get(apiToCall).subscribe((data: Array<Requests>) => {
        this.loadingService.showLoading(false, null);
        if (data.length > 10) {
          this.allRequestsByUser.push(data.slice(0, 10));
          this.allRequestsByUser.push(data.slice(10, data.length));
        } else if (data.length > 0) {
          this.allRequestsByUser.push(data);
        }
      }, error => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "error",
            message: error.error.message
          }
        })
      })
    })
  }

  addRequest(request: RequestDetails) {
    this.loadingService.showLoading(true, "Adding Request...");
    let apiToCall: string = config.serverUrl
    this.translate.get(["userTypes.student", "userTypes.publisher"]).subscribe(translations => {
      if (this.userDetails.type === translations["userTypes.student"]) {
        apiToCall += config.api.student + "/add/request"
      } else if (this.userDetails.type === translations["userTypes.publisher"]) {
        apiToCall += config.api.publisher + "/add/request"
      }
      this.http.post(apiToCall, request).subscribe((data: RequestsStatus) => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: data.message
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
        })
      })
    })
  }

  modifyRequest(request: RequestDetails) {
    this.loadingService.showLoading(true, "Modifing Request...");
    let apiToCall: string = config.serverUrl
    this.translate.get(["userTypes.student", "userTypes.publisher"]).subscribe(translations => {
      if (this.userDetails.type === translations["userTypes.student"]) {
        apiToCall += config.api.student + "/modify/request"
      } else if (this.userDetails.type === translations["userTypes.publisher"]) {
        apiToCall += config.api.publisher + "/modify/request"
      }
      this.http.post(apiToCall, request).subscribe((data: RequestsStatus) => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: data.message
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
        })
      })
    })
  }
}
