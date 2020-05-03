import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { AdminService } from "../../services/admin/admin.service";
import { Requests, RequestDetails } from '../../shared/interfaces/requests.interface';
import { PublisherService } from '../../services/publisher/publisher.service';
import { UserService } from '../../services/user/user.service';
import { Chart, ChartDataSets } from "chart.js";
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: "app-dashboard-screen",
  templateUrl: "./dashboard-screen.component.html",
  styleUrls: ["./dashboard-screen.component.scss"]
})
export class DashboardScreenComponent implements OnInit {
  height: string = window.innerHeight - 200 + "px";
  currentRequestPage: number = 0;
  requestPageNo: number = 0;
  requestLimit: number = 20;

  @ViewChild("publisherCanvas", { static: false }) publisherElement: ElementRef;
  @ViewChild("studentCanvas", { static: false }) studentELement: ElementRef;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private translate: TranslateService,
    public adminService: AdminService,
    public publisherService: PublisherService,
    public userService: UserService,
    private title: Title,
    private titleCase: TitleCasePipe
  ) { }

  ngOnInit() {
    this.title.setTitle(this.titleCase.transform(this.authenticationService.userType) + " Dashboard - StudyBoom")
    this.translate
      .get(["userTypes.admin", "userTypes.student", "userTypes.publisher"])
      .subscribe((translations) => {
        if (this.authenticationService.userType === translations["userTypes.admin"]) {
          this.adminService.allRequests = []
          this.adminService.getAllRequests({
            pageNo: this.requestPageNo,
            limit: this.requestLimit
          });
        } else if (this.authenticationService.userType === translations["userTypes.student"]) {
          this.generateUserDashboard()
        } else if (this.authenticationService.userType === translations["userTypes.publisher"]) {
          this.generatePublisherDashboard()
        }
      });
  }

  async generatePublisherDashboard() {
    await this.publisherService.getDashboardReports(this.authenticationService.userDetails.userIdFromPublisher.id)
    let labels: string[] = []
    let datasets: ChartDataSets[] = []
    let reviews: number[] = []

    for (let report of this.publisherService.dashboardReports) {
      labels.push(report.testSeriesName)
      reviews.push(report.overAllRating)
    }

    if (this.publisherElement && this.publisherService.dashboardReports.length > 0) {
      const publisherCanvas = this.publisherElement.nativeElement as HTMLCanvasElement

      const lineChart = new Chart(publisherCanvas.getContext("2d"), {
        type: "line",
        data: {
          labels: labels.reverse(),
          datasets: datasets
        }
      })

      datasets.push({
        data: reviews.reverse(),
        cubicInterpolationMode: "monotone",
        hoverBackgroundColor: "rgb(245, 154, 94)",
        borderJoinStyle: "miter",
        borderColor: "rgb(245, 154, 94)",
        borderWidth: 2,
        label: "Reviews",
      })

      this.translate.get("dashboardLabels.publisherDashboardLabels.publisherReport").subscribe(title => {
        lineChart.options = {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 5
              }
            }]
          },
          legend: {
            fullWidth: true,
            labels: {
              fontColor: "white"
            }
          },
          title: {
            display: true,
            text: title,
            fontColor: "white"
          }
        }
        lineChart.update()
      })
    }
  }

  async generateUserDashboard() {
    await this.userService.getDashboardReports(this.authenticationService.userDetails.userIdFromStudent.id)
    let labels: string[] = []
    let datasets: ChartDataSets[] = []
    let attemped: number[] = []
    let marksObtained: number[] = []

    for (let report of this.userService.dashboardReports) {
      labels.push(report.testSeriesName)
      attemped.push(report.attemped)
      marksObtained.push(report.marksObtained)
    }

    if (this.studentELement && this.userService.dashboardReports.length > 0) {
      const studentCanvas = this.studentELement.nativeElement as HTMLCanvasElement

      datasets.push({
        data: attemped.reverse(),
        cubicInterpolationMode: "monotone",
        hoverBackgroundColor: "rgb(245, 154, 94)",
        borderJoinStyle: "miter",
        borderColor: "rgb(245, 154, 94)",
        borderWidth: 1,
        label: "Attemped",
      })

      datasets.push({
        data: marksObtained.reverse(),
        cubicInterpolationMode: "monotone",
        hoverBackgroundColor: "rgb(29, 180, 97)",
        borderJoinStyle: "miter",
        borderColor: "rgb(29, 180, 97)",
        borderWidth: 2,
        label: "Marks Obtained.",
      })

      const lineChart = new Chart(studentCanvas.getContext("2d"), {
        type: "line",
        data: {
          labels: labels.reverse(),
          datasets: datasets
        }
      })
      this.translate.get("dashboardLabels.studentDashboardLabels.studentReport").subscribe(title => {
        lineChart.options = {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100
              }
            }]
          },
          legend: {
            fullWidth: true,
            labels: {
              fontColor: "white"
            }
          },
          title: {
            display: true,
            text: title,
            fontColor: "white"
          }
        }
        lineChart.update()
      })
    }
  }

  generateUserReport() {
    this.userService.generateReports(this.authenticationService.userDetails.userIdFromStudent.id)
  }

  generatePublisherReport() {
    this.publisherService.generateReports(this.authenticationService.userDetails.userIdFromPublisher.id)
  }

  editProfile() {
    this.translate
      .get(["userTypes.admin", "userTypes.student", "userTypes.publisher"])
      .subscribe((translations) => {
        if (
          this.authenticationService.userType ===
          translations["userTypes.publisher"]
        )
          this.router.navigate([
            "/dashboard",
            { outlets: { "dashboard-page-router": ["publisher-edit-details"] } }
          ]);
        if (
          this.authenticationService.userType ===
          translations["userTypes.admin"]
        )
          this.router.navigate([
            "/dashboard",
            { outlets: { "dashboard-page-router": ["admin-edit-details"] } }
          ]);
        if (
          this.authenticationService.userType ===
          translations["userTypes.student"]
        )
          this.router.navigate([
            "/dashboard",
            { outlets: { "dashboard-page-router": "user-edit-details" } }
          ]);
      });
  }

  nextAdminRequestPage() {
    this.currentRequestPage += 1;
    if (this.adminService.allUsers[this.requestPageNo + 1]) {
      this.requestPageNo += 1;
      this.adminService.getAllUsers({ pageNo: this.requestPageNo, limit: this.requestLimit });
    }
  }

  prevAdminRequestPage() {
    this.currentRequestPage -= 1;
  }

  changeStatus(status: "NOT_STARTED" | "ACCEPTED" | "NOT_ACCEPTED", request: Requests) {
    const requestDetails: RequestDetails = {
      userId: request.userIdToRequests.id,
      requestId: request.id,
      requestText: request.requestText,
      processed: true,
      status: status
    }
    this.requestPageNo = 0;
    this.adminService.modifyRequest(requestDetails);
  }
}
