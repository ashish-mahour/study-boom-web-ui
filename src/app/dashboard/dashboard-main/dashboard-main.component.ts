import { Component, OnInit, HostListener } from '@angular/core';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { Title } from '@angular/platform-browser';
import { routerInAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  animations: [routerInAnimation]
})
export class DashboardMainComponent implements OnInit {

  isMobile: boolean = false;
  userType: string = 'STUDENT';
  userUploadedProfilePic: string;

  constructor(
    private titleService: Title,
    private loadingService: LoadingAnimServiceService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Dashboard - StudyBoom")
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
}
