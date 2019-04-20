import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';

@Component({
  selector: 'app-publisher-more-details',
  templateUrl: './publisher-more-details.component.html',
  styleUrls: ['./publisher-more-details.component.scss']
})
export class PublisherMoreDetailsComponent implements OnInit {

  publisherMoreDetails: FormGroup = this.formBuilder.group
    (
      {
        mobile: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
        panNo: [null, [Validators.required, Validators.pattern("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}")]],
        bankName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
        branchName: [null, [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
        accountNo: [null, [Validators.required, Validators.pattern("[0-9]+")]],
        ifscCode: [null, [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]+")]]
      }
    );

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
  }

  skipTheStepAction(){
    this.dialog.open(AlertBoxComponent, {
      maxWidth: '25%',
      data: { title: 'Skipping this Step', type: 'warn', message: 'All the details is nessasary for transfer of money! Skipping the step means you can enter it later for money transfer purpuses!!' }
    })
  }

}
