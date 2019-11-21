import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { routerInAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  animations: [routerInAnimation]
})
export class DashboardMainComponent implements OnInit {

  isMobile: boolean = false;
  userType: string = 'PUBLISHER';
  userUploadedProfilePic: string;
  currentDate: number = new Date().getFullYear();

  constructor(
    private titleService: Title,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.get(
      [
        'pageTitles.dashboard.subDashboards.admin',
        'pageTitles.dashboard.subDashboards.student',
        'pageTitles.dashboard.subDashboards.publisher'
      ]
    ).subscribe(traslations => {
      if (this.userType === 'ADMIN')
        this.titleService.setTitle(traslations['pageTitles.dashboard.subDashboards.admin'])
      else if (this.userType === 'STUDENT')
        this.titleService.setTitle(traslations['pageTitles.dashboard.subDashboards.student'])
      else if (this.userType === 'PUBLISHER')
        this.titleService.setTitle(traslations['pageTitles.dashboard.subDashboards.publisher'])
    })
    this.checkBrowser();
  }

  @HostListener("window:resize")
  onResize() {
    this.checkBrowser();
  }

  checkBrowser() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    )
      this.isMobile = true
    else
      this.isMobile = false
  }
  changeProfilePic(event: any) {
    let file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = this.handleReaderEvent.bind(this);
    fileReader.readAsDataURL(file)
  }

  handleReaderEvent(event: any) {
    let reader: FileReader = event.target;
    this.userUploadedProfilePic = reader.result.toString();
  }
  editProfile() {
    if (this.userType === 'PUBLISHER')
      this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': ['publisher-edit-details'] } }])
    if (this.userType === 'ADMIN')
      this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': ['admin-edit-details'] } }])
    if (this.userType === 'STUDENT')
      this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': 'user-edit-details' } }])
  }
}
