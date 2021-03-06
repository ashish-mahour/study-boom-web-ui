import { Injectable } from "@angular/core";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { LoadingAnimServiceService } from "../../shared/loading/loading-anim-service.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import * as config from "../../shared/config.json";
import { HttpClient } from "@angular/common/http";
import { AddUpdateCategoriesComponent } from "../../admin-components/add-update-categories/add-update-categories.component";
import { Users } from '../../shared/interfaces/users.interfaces';
import { TestSeries, TestSeriesDetailsForAdmin } from '../../shared/interfaces/test-series.interface';
import { SubjectCategory, CategoryDetails } from '../../shared/interfaces/category.interface';
import { Requests, RequestDetails } from '../../shared/interfaces/requests.interface';
import { Page, CategoryStatus, RequestsStatus, TestSeriesStatus } from '../../shared/interfaces/status.interface';

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
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error ? error.error.message : "Error found in getting users!!"
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
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error ? error.error.message : "Error found in getting categories!!"
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
        (data: CategoryStatus) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: data.message
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
              message: error && error.error ? error.error.message : "Error found in adding/updating categories!!"
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
        (data: CategoryStatus) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: data.message
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
              message: error && error.error ? error.error.message : "Error found in deleting categories!!"
            }
          });
        }
      );
  }

  getAllRequests(page: Page) {
    this.loadingService.showLoading(true, "Getting all Requests...");
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
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error ? error.error.message : "Error found in getting requests!!"
            }
          });
        }
      );
  }
  modifyRequest(request: RequestDetails) {
    this.loadingService.showLoading(true, "Modifing Request...");
    this.http.post(config.serverUrl +
      config.api.admin +
      "/modify/users/request", request).subscribe((data: RequestsStatus) => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: data.message
          }
        });
        this.allRequests = []
        this.getAllRequests({ pageNo: 0, limit: 20 })
      }, error => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "error",
            message: error && error.error ? error.error.message : "Error modifing request."
          }
        })
      })
  }

  getAllTests(page: Page) {
    this.loadingService.showLoading(true, "Getting all Test Series...");
    this.http
      .get(
        config.serverUrl +
        config.api.admin +
        "/get/all/test/series?pageNo=" +
        page.pageNo +
        "&limit=" +
        page.limit
      )
      .subscribe(
        (data: Array<TestSeries>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.allTests.push(data.slice(0, 10));
            this.allTests.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.allTests.push(data);
          }
        },
        (error: any) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error ? error.error.message : "Error found in getting Test Series!!"
            }
          });
        }
      );
  }

  updateTestSeries(testSeriesDetails: TestSeriesDetailsForAdmin) {
    this.loadingService.showLoading(true, "Changing Visibility...");
    this.http.post(config.serverUrl +
      config.api.admin + "/modify/test/series", testSeriesDetails).subscribe((response: TestSeriesStatus) => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: response.message
          }
        });
        this.allTests = []
        this.getAllTests({ pageNo: 0, limit: 20 })
      }, (error: any) => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "error",
            message: error && error.error ? error.error.message : "Error found in getting Test Series!!"
          }
        });
      })
  }
}
