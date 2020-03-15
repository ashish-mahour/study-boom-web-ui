import { Injectable } from "@angular/core";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { LoadingAnimServiceService } from "../../shared/loading/loading-anim-service.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import * as config from "../../shared/config.json";
import { HttpClient } from "@angular/common/http";
import { AddUpdateCategoriesComponent } from "../../admin-components/add-update-categories/add-update-categories.component";
import { Users } from '../../shared/interfaces/users.interfaces';
import { TestSeries } from '../../shared/interfaces/test-series.interface';
import { SubjectCategory, CategoryDetails } from '../../shared/interfaces/category.interface';
import { Requests } from '../../shared/interfaces/requests.interface';
import { Page, CategoryStatus } from '../../shared/interfaces/status.interface';

@Injectable({
  providedIn: "root"
})
export class AdminService {
  allUsers: Array<Array<Users>> = [];
  allTests: Array<Array<TestSeries>> = [];
  allCategories: Array<Array<SubjectCategory>> = [];
  allRequests: Array<Array<Requests>> = [];

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  getAllUsers(page: Page) {
    this.loadingService.showLoading(true, "Getting all users..");
    this.http
      .get(
        config.serverUrl +
        config.api.admin +
        "/get/users?pageNo=" +
        page.pageNo +
        "&limit=" +
        page.limit
      )
      .subscribe(
        (data: Array<Users>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.allUsers.push(data.slice(0, 10));
            this.allUsers.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.allUsers.push(data);
          }
        },
        (_error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
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

  getAllCategories(page: Page) {
    this.loadingService.showLoading(true, "Getting all categories...");
    this.http
      .get(
        config.serverUrl +
        config.api.admin +
        "/get/subject/categories?pageNo=" +
        page.pageNo +
        "&limit=" +
        page.limit
      )
      .subscribe(
        (data: Array<SubjectCategory>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.allCategories.push(data.slice(0, 10));
            this.allCategories.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.allCategories.push(data);
          }
        },
        (_error: any) => {
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

  addUpdateCategories(
    categoryValue: CategoryDetails,
    update: boolean,
    dialogRef: MatDialogRef<AddUpdateCategoriesComponent>
  ) {
    dialogRef.close({ status: true });
    this.loadingService.showLoading(true, update ? "Updating Categories..." : "Adding Categories");

    let api: string;
    if (update) api = "/modify/subject/cateogories";
    else api = "/add/subject/cateogories";

    this.http
      .post(config.serverUrl + config.api.admin + api, categoryValue)
      .subscribe(
        (_data: CategoryStatus) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: "Category " + update ? "Updated!!" : "Added!!"
            }
          });
          this.allCategories = [];
          this.getAllCategories({ pageNo: 0, limit: 20 });
        },
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
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
  deleteCategories(category: SubjectCategory) {
    this.loadingService.showLoading(true, "Delete Category...");
    this.http
      .get(
        config.serverUrl +
        config.api.admin +
        "/delete/subject/cateogories?id=" +
        category.id
      )
      .subscribe(
        (_data: CategoryStatus) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: "Category Deleted!!"
            }
          });
        },
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
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

  getAllRequests(page: Page) {
    this.loadingService.showLoading(true, "Get all requests...");
    this.http
      .get(
        config.serverUrl +
        config.api.admin +
        "/get/users/requests?pageNo=" +
        page.pageNo +
        "&limit=" +
        page.limit
      )
      .subscribe(
        (data: Array<Requests>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.allRequests.push(data.slice(0, 10));
            this.allRequests.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.allRequests.push(data);
          }
        },
        (_error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in getting requests!!"
            }
          });
        }
      );
  }
}
