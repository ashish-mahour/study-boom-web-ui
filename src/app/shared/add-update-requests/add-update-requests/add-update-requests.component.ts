import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.requestData.controls['userId'].setValue(this.authenticationService.userDetails.id)
  }

  submitRequest() {
    
  }

}
