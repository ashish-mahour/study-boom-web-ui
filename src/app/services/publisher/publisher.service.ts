import { Injectable } from "@angular/core";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "../../shared/config.json";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { SubjectCategory } from '../../shared/interfaces/category.interface';

@Injectable({
  providedIn: "root"
})
export class PublisherService {
  allCategories: Array<SubjectCategory> = [];

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
  addTestSeries(testSeriesDetailsValue: any) {
    console.log(testSeriesDetailsValue);
    this.loadingService.showLoading(true, "Adding test series...");
    this.http
      .post(
        config.serverUrl + config.api.publisher + "/create/test/series",
        testSeriesDetailsValue
      )
      .subscribe(
        success => {
          console.log(success)
          this.loadingService.showLoading(false, null);
          this.dialog.open(AlertBoxComponent, {
            minWidth: "25%",
            maxWidth: "60%",
            data: {
              type: "success",
              message: "Test Series Created!!"
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
              message: "Error found in getting categories!!"
            }
          });
          this.router.navigateByUrl("/dashboard")
        }
      );
  }
}
