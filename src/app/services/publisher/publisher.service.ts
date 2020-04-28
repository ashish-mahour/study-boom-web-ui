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
import {TestSeriesDetails} from '../../shared/interfaces/test-series.interface';

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
              message: "Error found in getting categories!!"
            }
          });
        }
      );
  }

  addTestSeries(testSeriesDetailsValue: TestSeriesDetails) {
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
          console.log(error)
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in adding test series!!"
            }
          });
          this.router.navigateByUrl("/dashboard")
        }
      );
  }

  getDashboardReports() {
    this.loadingService.showLoading(true, "Getting Publisher Dashboard");
    this.http
      .get(
        config.serverUrl + config.api.publisher + "/get/reports"
      ).subscribe((data: Array<PublisherReport>) => {
        this.dashboardReports = data;
      },
        error => {
          console.log(error)
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: "Error found in getting publisher dashboard!!"
            }
          });
        }
      );
  }
}
