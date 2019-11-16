import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  userType: string;
  registrationForm: any = {};
  constructor(
    private titleService: Title,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingAnimServiceService,
    private translate: TranslateService
  ) {

  }


  ngOnInit() {
    this.titleService.setTitle('User type - StudyBoom')
    this.activateRoute.queryParams.subscribe(params => {
      this.registrationForm.fullname = params.fullname;
      this.registrationForm.email = params.email;
      this.registrationForm.password = params.password;
      this.registrationForm.username = params.username;
    })
  }

  userTypeSelected() {
    this.registrationForm.usertype = this.userType;
    this.translate.get(['userTypes.publisher', 'userTypes.student', 'userTypes.admin']).subscribe(translations => {
      if (this.userType === translations['userTypes.publisher'])
        this.registerPublisher();
      else if (this.userType === translations['userTypes.student'])
        this.registerStudent();
      else if (this.userType === translations['userTypes.admin'])
        this.registerAdmin();
    })

  }

  registerAdmin() {

  }

  registerPublisher() {
    this.router.navigate(["/home", { outlets: { 'home-page-router': ['publisher-more-details'] } }]);
  }

  registerStudent() {
    this.router.navigate(["/home", { outlets: { 'home-page-router': ['user-more-details'] } }]);
  }


}
