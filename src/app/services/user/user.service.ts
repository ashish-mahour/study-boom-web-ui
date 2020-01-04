import { Injectable } from '@angular/core';
import { LoadingAnimServiceService } from '../../shared/loading/loading-anim-service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import * as config from '../../shared/config.json';
import { AlertBoxComponent } from '../../shared/alert-box/alert-box.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  testData: any[] = []

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  getTestSeries(pageNo: number, limit: number, studentId: number) {
    this.loadingService.showLoading(true);
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
        (data: any[]) => {
          this.loadingService.showLoading(false);
          if (data.length > 10) {
            this.testData.push(data.slice(0, 10));
            this.testData.push(data.slice(10, data.length));
          } else if (data.length > 0) {
            this.testData.push(data);
          }
        },
        (error: any) => {
          let message = "Error found in getting Test Series!!"
          if(error.status === 400)
            message = "Please choose categories for Test Series"
          this.loadingService.showLoading(false);
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
}
