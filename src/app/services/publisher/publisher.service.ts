import { Injectable } from "@angular/core";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "../../shared/config.json";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { SubjectCategory } from '../../shared/interfaces/category.interface';
import { TestSeriesStatus } from '../../shared/interfaces/status.interface';
import { PublisherReport } from '../../shared/interfaces/reports.interface';
import {TestSeriesDetailsForPublisher} from '../../shared/interfaces/test-series.interface';

@Injectable({
  providedIn: "root"
})
export class PublisherService {
  allCategories: Array<SubjectCategory> = [];
  dashboardReports: Array<PublisherReport> = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}

  getAllCategories() {
    this.loadingService.showLoading(true, "Getting categories...");
    this.http
      .get(config.serverUrl + config.api.publisher + "/get/subject/categories")
      .subscribe(
        (data: any[]) => {
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
              message: error && error.error? error.error.message: "Error found in getting categories!!"
            }
          });
        }
      );
  }

  addTestSeries(testSeriesDetailsValue: TestSeriesDetailsForPublisher) {
    this.loadingService.showLoading(true, "Adding test series...");
    this.http
      .post(
        config.serverUrl + config.api.publisher + "/create/test/series",
        testSeriesDetailsValue
      )
      .subscribe(
        (data: TestSeriesStatus) => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: data.message
            }
          });
          this.router.navigateByUrl("/dashboard")
        },
        error => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error? error.error.message: "Error found in adding test series!!"
            }
          });
          this.router.navigateByUrl("/dashboard")
        }
      );
  }

  getDashboardReports(publisherId: number) {
    this.loadingService.showLoading(true, "Getting Publisher Dashboard");
    return new Promise<void>((resolve, reject) => {
    this.http
      .get(
        config.serverUrl + config.api.publisher + "/get/reports?publisherId=" + publisherId
      ).subscribe((data: Array<PublisherReport>) => {
        this.loadingService.showLoading(false, null);
        this.dashboardReports = data;
        resolve()
      },
        error => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error? error.error.message: "Error found in getting publisher dashboard!!"
            }
          });
          reject()
        }
      );
    })
  }
  generateReports(publisherId: number) {
    this.loadingService.showLoading(true, "Getting Publisher Report...");
    this.http
      .get(
        config.serverUrl + config.api.publisher + "/generate/reports?publisherId=" + publisherId, { responseType: "blob" as "json", observe: "response" }
      ).subscribe(response => {
        this.loadingService.showLoading(false, null);
        const url = URL.createObjectURL(response.body)
        const a = document.createElement("a")
        a.href = url
        a.download = response.headers.get('FILE_NAME')
        a.click()
      },
        error => {
          console.log(error)
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in generating User Report!!"
            }
          });
        }
      );
  }
}
