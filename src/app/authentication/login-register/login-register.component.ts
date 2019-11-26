import { AlertBoxComponent } from "./../../shared/alert-box/alert-box.component";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: [
      null,
      [Validators.required, Validators.pattern("[A-Za-z0-9]+[@.]*")]
    ],
    password: [null, [Validators.required]]
  });

  registerForm: FormGroup = this.formBuilder.group({
    fullname: [null, [Validators.required, Validators.pattern("[A-Za-z ]+")]],
    email: [
      null,
      [
        Validators.required,
        Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")
      ]
    ],
    username: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+")]],
    password: [null, [Validators.required]]
  });

  loginErrorText: string;
  registrationErrorText: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  performLogin() {
    if (this.validateLogin())
      this.authenticationService.loginUser(this.loginForm.value);
  }

  performRegistration() {
    this.registerForm.controls["password"].setValue(
      btoa(this.registerForm.controls["password"].value)
    );
    if (this.validateRegistration()) {
      this.router.navigate(
        ["/home", { outlets: { "home-page-router": ["usertype"] } }],
        { queryParams: this.registerForm.value }
      );
    }
  }

  validateLogin(): boolean {
    if (
      this.loginForm.controls["username"].hasError("required") ||
      this.loginForm.controls["password"].hasError("required")
    ) {
      this.translate.get("errors.allFields").subscribe(translations => {
        this.loginErrorText = translations;
      });
      return false;
    }
    this.loginErrorText = undefined;
    return true;
  }

  validateRegistration(): boolean {
    if (
      this.registerForm.controls["fullname"].hasError("required") ||
      this.registerForm.controls["email"].hasError("required") ||
      this.registerForm.controls["username"].hasError("required") ||
      this.registerForm.controls["password"].hasError("required")
    ) {
      this.translate.get("errors.allFields").subscribe(translations => {
        this.registrationErrorText = translations;
      });
      return false;
    }
    this.registrationErrorText = undefined;
    return true;
  }
  openDialog() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: "25%",
      maxWidth: "70%",
      data: {
        type: "success",
        message: "This is just a demo please do not get serious!"
      }
    });
  }
}
