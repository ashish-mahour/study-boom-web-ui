import { AlertBoxComponent } from './../../shared/alert-box/alert-box.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+")]],
    password: [null, [Validators.required]]
  })

  registerForm: FormGroup = this.formBuilder.group({
    fullname: [null, [Validators.required, Validators.pattern("[A-Za-z ]+")]],
    email: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")]],
    username: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+")]],
    password: [null, [Validators.required]]
  })

  loginErrorText: string;
  registrationErrorText: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  performLogin() {
    if (this.validateLogin())
      console.log(this.loginForm.value)
  }

  performRegistration() {
    if (this.validateRegistration()) {
      this.router.navigate(['/home', { outlets: { 'home-page-router': ['usertype'] } }]
        , { queryParams: this.registerForm.value, skipLocationChange:true });
    }
  }

  validateLogin(): boolean {
    if (this.loginForm.controls['username'].hasError('required') ||
      this.loginForm.controls['password'].hasError('required')) {
      this.loginErrorText = 'All fields must be filled!'
      return false;
    }
    this.loginErrorText = undefined
    return true;
  }

  validateRegistration(): boolean {
    if (this.registerForm.controls['fullname'].hasError('required') ||
      this.registerForm.controls['email'].hasError('required') ||
      this.registerForm.controls['username'].hasError('required') ||
      this.registerForm.controls['password'].hasError('required')) {
      this.registrationErrorText = 'All fields must be filled!'
      return false;
    }
    this.registrationErrorText = undefined
    return true;
  }
  openDialog() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: '25%',
      data: { title: 'Warning', type: 'warn', message: 'This is just a demo please do not get serious!' }
    })
  }

}
