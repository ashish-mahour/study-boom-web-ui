import { Injectable } from "@angular/core";
import { AlertBoxComponent } from "src/app/shared/alert-box/alert-box.component";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as config from "src/app/shared/config.json";
import { HttpClient } from "@angular/common/http";
import { AddUpdateCategoriesComponent } from "src/app/admin-components/add-update-categories/add-update-categories.component";

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

  addUpdateCategories(
    categoryValue: any,
    update: boolean,
    dialogRef: MatDialogRef<AddUpdateCategoriesComponent>
  ) {
    dialogRef.close({ status: true });
    this.loadingService.showLoading(true);

    let api: string;
    if (update) api = "/modify/subject/cateogories";
    else api = "/add/subject/cateogories";

    this.http
      .post(config.serverUrl + config.api.admin + api, categoryValue)
      .subscribe(
        (data: any[]) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: "Category " + update ? "Updated!!" : "Added!!"
            }
          });
          this.allCategories = [];
          this.getAllCategories(0, 20);
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in adding/updating categories!!"
            }
          });
        }
      );
  }
  deleteCategories(category: any) {
    this.loadingService.showLoading(true);
    this.http
      .get(
        config.serverUrl +
          config.api.admin +
          "/delete/subject/cateogories?id=" +
          category.id
      )
      .subscribe(
        (data: any[]) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: "Category Deleted!!"
            }
          });
        },
        (error: any) => {
          this.loadingService.showLoading(false);
          const alertBox = this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in deleting categories!!"
            }
          });
        }
      );
  }
}
