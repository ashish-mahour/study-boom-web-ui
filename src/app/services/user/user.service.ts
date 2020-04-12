import { Injectable } from '@angular/core';
import { LoadingAnimServiceService } from '../../shared/loading/loading-anim-service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import * as config from '../../shared/config.json';
import { AlertBoxComponent } from '../../shared/alert-box/alert-box.component';
import { TestSeries } from '../../shared/interfaces/test-series.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testData: Array<Array<TestSeries>> = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  getTestSeries(pageNo: number, limit: number, studentId: number) {
    this.loadingService.showLoading(true, "Getting test series...");
    this.http
      .get(
        config.serverUrl +
        config.api.student +
        "/get/test/series/by/categories?studentId=" + studentId + "&pageNo=" +
        pageNo +
        "&limit=" +
        limit
      )
      .subscribe(
        (data: Array<TestSeries>) => {
          this.loadingService.showLoading(false, null);
          if (data.length > 10) {
            this.testData.push(data.slice(0, 10));
            this.testData.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.testData.push(data);
          }
        },
        (error: any) => {
          let message = "Error found in getting Test Series!!"
          if (error.status === 400)
            message = "Please choose categories for Test Series"
          this.loadingService.showLoading(false, null);
          const alertBox = this.dialog.open(AlertBoxComponent, {
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

  testPerformed(studentPerformedTest: any) {
    this.loadingService.showLoading(true, null);
    this.http.post(config.serverUrl +
      config.api.student +
      "/test/performed", studentPerformedTest).subscribe(_success => {
        this.loadingService.showLoading(false, null);
        const alertBox = this.dialog.open(AlertBoxComponent, {
          minWidth: "25%",
          maxWidth: "60%",
          data: {
            type: "success",
            message: "Test Performed!!"
          }
        });
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
      })
  }
}
