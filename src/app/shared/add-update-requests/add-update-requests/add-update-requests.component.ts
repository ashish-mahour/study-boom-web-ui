import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Requests } from '../../interfaces/requests.interface';

@Component({
  selector: 'app-add-update-requests',
  templateUrl: './add-update-requests.component.html',
  styleUrls: ['./add-update-requests.component.scss']
})
export class AddUpdateRequestsComponent implements OnInit {

  requestData: FormGroup = this.formBuilder.group({
    userId: [null, [Validators.required]],
    requestId: null,
    requestText: [null, [Validators.required]],
    processed: false,
    status: "NOT_STARTED"
  })

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<AddUpdateRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: { pageNo: number, requestData?: Requests }
  ) { }

  ngOnInit() {
    if (this.dialogData.requestData) {
      const request = this.dialogData.requestData
      this.requestData.setValue({
        userId: null,
        requestId: request.id,
        requestText: request.requestText,
        processed: request.processed,
        status: request.status
      })
    } 
    this.requestData.controls['userId'].setValue(this.authenticationService.userDetails.id)
  }

  submitRequest() {
    if (this.requestData.valid) {
      if (this.dialogData.requestData) {
        this.authenticationService.modifyRequest(this.requestData.value)
      } else {
        this.authenticationService.addRequest(this.requestData.value)
      }
      this.dialogRef.close()
    }
  }

}
