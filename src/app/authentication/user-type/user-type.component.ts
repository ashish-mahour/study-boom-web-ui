import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingAnimServiceService } from "../../shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as Config from "../../shared/config.json";
import { MatDialog } from "@angular/material/dialog";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { TranslateService } from "@ngx-translate/core";
import { UserDetails } from '../../shared/interfaces/users.interfaces';

@Component({
  selector: "app-user-type",
  templateUrl: "./user-type.component.html",
  styleUrls: ["./user-type.component.scss"]
})
export class UserTypeComponent implements OnInit {
  userType: string;
  registrationForm: UserDetails = {
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
  constructor(
    private titleService: Title,
    private activateRoute: ActivatedRoute,
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("User type - StudyBoom");
    this.activateRoute.queryParams.subscribe(params => {
      this.registrationForm.fullName = params.fullname;
      this.registrationForm.email = params.email;
      this.registrationForm.password = params.password;
      this.registrationForm.username = params.username;
    });
  }

  userTypeSelected() {
    this.registrationForm.type = this.userType;
    this.registrationForm.password = this.registrationForm.password;
    this.loadingService.showLoading(true, "Selecting "+ this.userType);
    this.http
      .post(
        Config.serverUrl + Config.api.authentication + "/create/account",
        this.registrationForm
      )
      .subscribe(
        (data: any) => {
          this.loadingService.showLoading(false, null);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: data.message
            }
          });
          alertBox.afterClosed().subscribe(alertData => {
            this.translate
              .get([
                "userTypes.student",
                "userTypes.publisher"
              ])
              .subscribe(translations => {
                if (alertData && alertData.status) {
                  if (this.userType === translations["userTypes.student"])
                    this.router.navigate(
                      [
                        "/home",
                        {
                          outlets: { "home-page-router": ["user-more-details"] }
                        }
                      ],
                      { queryParams: { id: data.userId } }
                    );
                  if (this.userType === translations["userTypes.publisher"])
                    this.router.navigate(
                      [
                        "/home",
                        {
                          outlets: {
                            "home-page-router": ["publisher-more-details"]
                          }
                        }
                      ],
                      { queryParams: { id: data.userId } }
                    );
                }
              });
          });
        },
        error => {
          this.loadingService.showLoading(false, null);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error.error.message
            }
          });
          alertBox.afterClosed().subscribe(data => {
            if (data && data.status) {
              this.router.navigateByUrl("/home");
            }
          });
        }
      );
  }
}
