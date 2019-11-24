import { Injectable } from "@angular/core";
import { AlertBoxComponent } from "src/app/shared/alert-box/alert-box.component";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as config from "src/app/shared/config.json";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  allUsers: any[] = [];
  allTests: any[] = [];
  allCategories: any[] = [];

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {}

  getAllUsers(pageNo: number, limit: number) {
    this.loadingService.showLoading(true);
    this.http
      .get(
        config.serverUrl +
          config.api.admin +
          "/get/users?pageNo=" +
          pageNo +
          "&limit=" +
          limit
      )
      .subscribe(
        (data: any[]) => {
          this.loadingService.showLoading(false);
          if (data.length > 10) {
            this.allUsers.push(data.slice(0, 10));
            this.allUsers.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.allUsers.push(data);
          }
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in getting users!!"
            }
          });
        }
      );
  }

  getAllCategories(pageNo: number, limit: number) {
    this.loadingService.showLoading(true);
    this.http
      .get(
        config.serverUrl +
          config.api.admin +
          "/get/subject/categories?pageNo=" +
          pageNo +
          "&limit=" +
          limit
      )
      .subscribe(
        (data: any[]) => {
          this.loadingService.showLoading(false);
          if (data.length > 10) {
            this.allCategories.push(data.slice(0, 10));
            this.allCategories.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.allCategories.push(data);
          }
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
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
}
