import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { AdminService } from '../../services/admin/admin.service';
import { TestSeries, TestSeriesDetailsForAdmin } from 'src/app/shared/interfaces/test-series.interface';

@Component({
  selector: "app-manage-test-series",
  templateUrl: "./manage-test-series.component.html",
  styleUrls: ["./manage-test-series.component.scss"]
})
export class ManageTestSeriesComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";
  allTestCurrentPageNo: number = 0;
  limit: number = 20;
  constructor(
    public authenticationService: AuthenticationService,
    public adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.allTests = []
    this.adminService.getAllTests({ pageNo: this.allTestCurrentPageNo, limit: this.limit })
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  nextAllTestPage() {
    this.allTestCurrentPageNo += 1;
    if (this.adminService.allTests[this.allTestCurrentPageNo]) {
      this.adminService.getAllTests({ pageNo: this.allTestCurrentPageNo, limit: this.limit });
    }
  }

  prevAllTestPage() {
    this.allTestCurrentPageNo -= 1;
  }

  updateTestSeries(testSeries: TestSeries) {
    const testSeriesDetails: TestSeriesDetailsForAdmin = {
      testSeriesId: testSeries.id,
      testSeriesName: testSeries.name,
      categoryId: null,
      subCategoryId: testSeries.subjectSubCategoryIdToTestSeries.id,
      totalQuestions: testSeries.totalQuestions,
      totalMarks: testSeries.totalMarks,
      durationMax: testSeries.durationMin,
      passingMarks: testSeries.passingMarks,
      price: testSeries.price,
      isVisible: testSeries.isVisible,
      adminId: this.authenticationService.userDetails.userIdFromAdmin.id,
      testSeriesQuestions: []
    }
    this.adminService.updateTestSeries(testSeriesDetails)
  }
}
