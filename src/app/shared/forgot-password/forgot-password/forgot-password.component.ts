import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {
    this.changePasswordForm = formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")
        ]
      ],
      oldPassword: [
        null,
        [Validators.required]
      ],
      newPassword: [
        null,
        [Validators.required]
      ]
    })
  }

  ngOnInit() {
  }

  changePassword() {
    this.dialogRef.close()
    this.authenticationService.changePassword(this.changePasswordForm.value)
  }
}
