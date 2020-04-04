import { Component, OnInit, HostListener, NgZone } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { routerInAnimation, dropDownAnimation } from "../../shared/animations";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import * as config from '../../shared/config.json';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: "app-dashboard-main",
  templateUrl: "./dashboard-main.component.html",
  styleUrls: ["./dashboard-main.component.scss"],
  animations: [routerInAnimation, dropDownAnimation]
})
export class DashboardMainComponent implements OnInit {
  isMobile: boolean = true;
  currentDate: number = new Date().getFullYear();

  constructor(
    private titleService: Title,
    private router: Router,
    private translate: TranslateService,
    public authenticationService: AuthenticationService,
    private firebaseService: FirebaseService,
    private zone: NgZone,
    public loadingService: LoadingAnimServiceService
  ) {
    this.loadingService.showLoading(true, "Logging in...")
  }

  ngOnInit() {
    this.translate
      .get([
        "pageTitles.dashboard.subDashboards.admin",
        "pageTitles.dashboard.subDashboards.student",
        "pageTitles.dashboard.subDashboards.publisher"
      ])
      .subscribe(traslations => {
        if (this.authenticationService.userType === "ADMIN")
          this.titleService.setTitle(
            traslations["pageTitles.dashboard.subDashboards.admin"]
          );
        else if (this.authenticationService.userType === "STUDENT")
          this.titleService.setTitle(
            traslations["pageTitles.dashboard.subDashboards.student"]
          );
        else if (this.authenticationService.userType === "PUBLISHER")
          this.titleService.setTitle(
            traslations["pageTitles.dashboard.subDashboards.publisher"]
          );
      });
    this.checkBrowser();
  }

  @HostListener("window:resize")
  onResize() {
    this.zone.run(() => {
      this.translate.get("loading").subscribe(x => this.loadingService.showLoading(true, x))
      this.checkBrowser();
      this.loadingService.showLoading(false, null)
    })
  }

  checkBrowser() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    )
      this.isMobile = true;
    else this.isMobile = false;
  }

  navBarToggle(navBar: MatSidenav) {
    if(this.isMobile)
      navBar.toggle()
  }

  changeProfilePic(event: any) {
    let file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = (event) => {
      if (event && event.target && event.target.result)
        this.uploadProfilePic(file.name, event.target.result.toString())
    }
  }

  async uploadProfilePic(fileName: string, dataURL: string) {
    this.authenticationService.mofifiedUserDetails.type = this.authenticationService.userDetails.type;
    this.authenticationService.mofifiedUserDetails.id = this.authenticationService.userDetails.id;
    let location: string
    if (this.authenticationService.userDetails.type === config.userTypes.admin)
      location = config.firebaseImageFolders.admin + this.authenticationService.userDetails.id + "/" + fileName
    else if (this.authenticationService.userDetails.type === config.userTypes.publisher)
      location = config.firebaseImageFolders.publisher + this.authenticationService.userDetails.id + "/" + fileName
    else if (this.authenticationService.userDetails.type === config.userTypes.student)
      location = config.firebaseImageFolders.student + this.authenticationService.userDetails.id + "/" + fileName
    if (!location)
      return;
    this.authenticationService.mofifiedUserDetails.profilePic = await this.firebaseService.uploadFile(location, dataURL, "data_url");
    this.authenticationService.modifyUsers(config.modifiedCommands.changeProfilePic)
  }
  editProfile() {
    if (this.authenticationService.userType === "PUBLISHER")
      this.router.navigate([
        "/dashboard",
        { outlets: { "dashboard-page-router": ["publisher-edit-details"] } }
      ]);
    if (this.authenticationService.userType === "ADMIN")
      this.router.navigate([
        "/dashboard",
        { outlets: { "dashboard-page-router": ["admin-edit-details"] } }
      ]);
    if (this.authenticationService.userType === "STUDENT")
      this.router.navigate([
        "/dashboard",
        { outlets: { "dashboard-page-router": "user-edit-details" } }
      ]);
  }
}
