import { Injectable } from "@angular/core";
import { LoadingAnimServiceService } from "src/app/shared/loading/loading-anim-service.service";
import { HttpClient } from "@angular/common/http";
import * as config from "../../shared/config.json";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class PublisherService {
  allCategories: any[] = [];

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  getAllCategories() {
    this.loadingService.showLoading(true);
    this.http
      .get(config.serverUrl + config.api.publisher + "/get/subject/categories")
      .subscribe(
        (data: any[]) => {
          this.loadingService.showLoading(false);
          this.allCategories = data;
        },
        (error: any) => {
          this.loadingService.showLoading(false);
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
}
