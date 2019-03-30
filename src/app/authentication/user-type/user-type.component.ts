import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private activateRoute: ActivatedRoute
  ) { }

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
  }

}
