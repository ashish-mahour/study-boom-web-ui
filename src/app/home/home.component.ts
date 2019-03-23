import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../shared/alert-box/alert-box.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private title: Title) { 
      title.setTitle("Home - StudyBoom")
    }



  ngOnInit() {
  }

  performLogin() {
    if (this.validateLogin())
      console.log(this.loginForm.value)
  }

  performRegistration() {
    if (this.validateRegistration())
      console.log(this.registerForm.value)
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
      minWidth:'25%',
      data:{title:'Warning', type:'warn', message:'This is just a demo please do not get serious!'}
    })
  }

}
