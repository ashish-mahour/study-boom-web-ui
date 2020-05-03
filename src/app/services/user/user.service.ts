import { Injectable } from '@angular/core';
import { LoadingAnimServiceService } from '../../shared/loading/loading-anim-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import * as config from '../../shared/config.json';
import { AlertBoxComponent } from '../../shared/alert-box/alert-box.component';
import { TestSeries, StudentPerfromedTest } from '../../shared/interfaces/test-series.interface';
import { Page } from '../../shared/interfaces/status.interface';
import { Router } from '@angular/router';
import { StudentPerformedTestRequest } from '../../shared/interfaces/users.interfaces';
import { UserReport } from '../../shared/interfaces/reports.interface';
import { TestSeriesRatings, TestSeriesRatingsStatus } from '../../shared/interfaces/test-series-ratings.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testData: Array<Array<TestSeries>> = []
  performedTestData: Array<Array<StudentPerfromedTest>> = []
  dashboardReports: Array<UserReport> = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) { }

  getAllTestSeries(page: Page, studentId: number) {
    this.loadingService.showLoading(true, "Getting All Test Series...");
    this.http
      .get(
        config.serverUrl +
        config.api.student +
        "/get/test/series/by/categories?studentId=" + studentId + "&pageNo=" +
        page.pageNo +
        "&limit=" +
        page.limit
      )
      .subscribe(
        (data: Array<TestSeries>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.testData.push(data.slice(0, 10));
            this.testData.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.testData.push(data);
          } else {
            const message = "Please choose categories for Test Series!!"
            this.loadingService.showLoading(false, null);
            this.dialog.open(AlertBoxComponent, {
              minWidth: "25%",
              maxWidth: "60%",
              data: {
                type: "error",
                message: message
              }
            });
          }
        },
        (error: any) => {
          const message = error && error.error ? error.error.message : "Error found in getting All Test Series!!"
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: message
            }
          });
        }
      );
  }

  getPerformedTestSeries(page: Page, studentId: number) {
    this.loadingService.showLoading(true, "Getting Test Series...");
    this.http
      .get(
        config.serverUrl +
        config.api.student +
        "/get/performed/test/series?studentId=" + studentId + "&pageNo=" +
        page.pageNo +
        "&limit=" +
        page.limit
      )
      .subscribe(
        (data: Array<StudentPerfromedTest>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.performedTestData.push(data.slice(0, 10));
            this.performedTestData.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.performedTestData.push(data);
          }
        },
        (error: any) => {
          let message = error && error.error ? error.error.message : "Error found in getting Performed Test Series!!"
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: message
            }
          });
        }
      );
  }

  testPerformed(studentPerformedTest: StudentPerformedTestRequest) {
    this.loadingService.showLoading(true, "Performing Test Series...");
    return new Promise<void>((resolve, reject) => {
      this.http.post(config.serverUrl +
        config.api.student +
        "/test/performed", studentPerformedTest).subscribe(_success => {
          this.loadingService.showLoading(false, null);
          this.router.navigateByUrl("/dashboard")
          resolve()
        }, error => {
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "error",
              message: error && error.error ? error.error.message : "Error while performing test!!"
            }
          });
          this.router.navigateByUrl("/dashboard")
          reject()
        })
    })
  }

  submitRatings(testSeriesRatings: TestSeriesRatings) {
    this.loadingService.showLoading(true, "Submitting Ratings...");
    this.http.post(config.serverUrl + config.api.student + "/submit/ratings", testSeriesRatings).subscribe((success: TestSeriesRatingsStatus) => {
      this.loadingService.showLoading(false, null);
      this.dialog.open(AlertBoxComponent, {
        minWidth: "25%",
        maxWidth: "60%",
        data: {
          type: "success",
          message: "Thanks for submitting your valuable ratings."
        }
      });
    }, error => {
      this.loadingService.showLoading(false, null);
      this.dialog.open(AlertBoxComponent, {
        minWidth: "25%",
        maxWidth: "60%",
        data: {
          type: "error",
          message: error && error.error ? error.error.message : "Error while performing test!!"
        }
      });
    })
  }

  getDashboardReports(studentId: number) {
    this.loadingService.showLoading(true, "Getting Student Dashboard...");
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(
          config.serverUrl + config.api.student + "/get/reports?studentId=" + studentId
        ).subscribe((data: Array<UserReport>) => {
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
                message: error && error.error ? error.error.message : "Error found in getting user dashboard!!"
              }
            });
            reject()
          }
        );
    })

  }
  generateReports(studentId: number) {
    this.loadingService.showLoading(true, "Getting Student Report...");
    this.http
      .get(
        config.serverUrl + config.api.student + "/generate/reports?studentId=" + studentId, { responseType: "blob" as "json", observe: "response" }
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
