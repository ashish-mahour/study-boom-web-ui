import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import * as config from "src/app/shared/config.json";

@Component({
  selector: "app-publisher-edit-details",
  templateUrl: "./publisher-edit-details.component.html",
  styleUrls: ["./publisher-edit-details.component.scss"]
})
export class PublisherEditDetailsComponent implements OnInit {
  publisherEditForm: FormGroup = this.formBuilder.group({
    fullname: [
      this.authenticationService.userDetails.fullName,
      [Validators.required, Validators.pattern("[A-Za-z ]+")]
    ],
    email: [
      this.authenticationService.userDetails.email,
      [
        Validators.required,
        Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")
      ]
    ],
    username: [
      this.authenticationService.userDetails.username,
      [Validators.required, Validators.pattern("[A-Za-z0-9]+")]
    ],
    password: [atob(this.authenticationService.userDetails.password), [Validators.required]],
    mobile: [
      this.authenticationService.userDetails.userIdFromPublisher.mobile,
      [Validators.required, Validators.pattern("[0-9]{10}")]
    ],
    bankName: [
      this.authenticationService.userDetails.userIdFromPublisher.bankName,
      [Validators.required, Validators.pattern("[a-zA-Z ]+")]
    ],
    branchName: [
      this.authenticationService.userDetails.userIdFromPublisher.branch,
      [Validators.required, Validators.pattern("[a-zA-Z ]+")]
    ],
    accountNo: [
      this.authenticationService.userDetails.userIdFromPublisher.accountNo,
      [Validators.required, Validators.pattern("[0-9]+")]
    ],
    ifscCode: [
      this.authenticationService.userDetails.userIdFromPublisher.ifscCode,
      [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]+")]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  editProfile() {
    this.authenticationService.mofifiedUserDetails.fullName = this.publisherEditForm.controls[
      "fullname"
    ].value;
    this.authenticationService.mofifiedUserDetails.email = this.publisherEditForm.controls[
      "email"
    ].value;
    this.authenticationService.mofifiedUserDetails.username = this.publisherEditForm.controls[
      "username"
    ].value;
    this.authenticationService.mofifiedUserDetails.password = btoa(this.publisherEditForm.controls[
      "password"
    ].value);
    this.authenticationService.mofifiedUserDetails.mobileNo = this.publisherEditForm.controls[
      "mobile"
    ].value;
    this.authenticationService.mofifiedUserDetails.bankName = this.publisherEditForm.controls[
      "bankName"
    ].value;
    this.authenticationService.mofifiedUserDetails.branchName = this.publisherEditForm.controls[
      "branchName"
    ].value;
    this.authenticationService.mofifiedUserDetails.accountNo = this.publisherEditForm.controls[
      "accountNo"
    ].value;
    this.authenticationService.mofifiedUserDetails.ifscCode = this.publisherEditForm.controls[
      "ifscCode"
    ].value;
    this.authenticationService.mofifiedUserDetails.type = this.authenticationService.userDetails.type;
    this.authenticationService.mofifiedUserDetails.id = this.authenticationService.userDetails.id;
    this.authenticationService.modifyUsers(
      config.modifiedCommands.updatePublisher
    );
  }
}
