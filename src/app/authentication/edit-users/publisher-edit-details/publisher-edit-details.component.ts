import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-publisher-edit-details',
  templateUrl: './publisher-edit-details.component.html',
  styleUrls: ['./publisher-edit-details.component.scss']
})
export class PublisherEditDetailsComponent implements OnInit {

  userType: string = 'PUBLISHER';

  publisherEditForm: FormGroup = this.formBuilder.group({
    fullname: [null, [Validators.required, Validators.pattern("[A-Za-z ]+")]],
    email: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")]],
    username: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+")]],
    password: [null, [Validators.required]],
    mobile: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
    panNo: [null, [Validators.required, Validators.pattern("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}")]],
    bankName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
    branchName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
    accountNo: [null, [Validators.required, Validators.pattern("[0-9]+")]],
    ifscCode: [null, [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]+")]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  editProfile() {

  }
}
