import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';

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
    private loadingService: LoadingAnimServiceService
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
    if (this.userType === 'PUBLISHER')
      this.router.navigate(["/home", { outlets: { 'home-page-router': ['publisher-more-details'] } }]
        , { queryParams: this.registrationForm });
    else if (this.userType === 'STUDENT')
      this.router.navigate(["/home", { outlets: { 'home-page-router': ['user-more-details'] } }]
        , { queryParams: this.registrationForm });
    else if (this.userType === 'ADMIN')
      this.registerAdmin();
  }

  registerAdmin() {

  }

}
