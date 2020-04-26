import { Injectable } from '@angular/core';
import { LoadingAnimServiceService } from '../../shared/loading/loading-anim-service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import * as config from '../../shared/config.json';
import { AlertBoxComponent } from '../../shared/alert-box/alert-box.component';
import { TestSeries, StudentPerfromedTest } from '../../shared/interfaces/test-series.interface';
import { Page } from 'src/app/shared/interfaces/status.interface';
import { Router } from '@angular/router';
import { StudentPerformedTestRequest } from 'src/app/shared/interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testData: Array<Array<TestSeries>> = []
  performedTestData: Array<Array<StudentPerfromedTest>> = []

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
          const message = "Error found in getting All Test Series!!"
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
    this.loadingService.showLoading(true, "Getting test series...");
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
          let message = "Error found in getting Performed Test Series!!"
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
    this.loadingService.showLoading(true, null);
    this.http.post(config.serverUrl +
      config.api.student +
      "/test/performed", studentPerformedTest).subscribe(_success => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: "Test Performed!!"
          }
        });
        this.router.navigateByUrl("/dashboard")
      }, _error => {
        this.loadingService.showLoading(false, null);
        this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "error",
            message: "Error while performing test!!"
          }
        });
        this.router.navigateByUrl("/dashboard")
      })
  }
}
