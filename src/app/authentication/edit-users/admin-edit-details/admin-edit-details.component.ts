import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-details',
  templateUrl: './admin-edit-details.component.html',
  styleUrls: ['./admin-edit-details.component.scss']
})
export class AdminEditDetailsComponent implements OnInit {

  userType: string = 'ADMIN';

  adminEditForm: FormGroup = this.formBuilder.group({
    fullname: [null, [Validators.required, Validators.pattern("[A-Za-z ]+")]],
    email: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")]],
    username: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+")]],
    password: [null, [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  editProfile() {

  }

}
