import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import * as config from "src/app/shared/config.json";

@Component({
  selector: "app-admin-edit-details",
  templateUrl: "./admin-edit-details.component.html",
  styleUrls: ["./admin-edit-details.component.scss"]
})
export class AdminEditDetailsComponent implements OnInit {
  
  adminEditForm: FormGroup = this.formBuilder.group({
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
    password: [null, [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  editProfile() {
    this.authenticationService.mofifiedUserDetails.fullName = this.adminEditForm.controls[
      "fullname"
    ].value;
    this.authenticationService.mofifiedUserDetails.email = this.adminEditForm.controls[
      "email"
    ].value;
    this.authenticationService.mofifiedUserDetails.username = this.adminEditForm.controls[
      "username"
    ].value;
    this.authenticationService.mofifiedUserDetails.password = btoa(this.adminEditForm.controls[
      "password"
    ].value)

    this.authenticationService.modifyUsers(config.modifiedCommands.updateAdmin);
  }
}
