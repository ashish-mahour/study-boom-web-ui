import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';

@Component({
  selector: 'app-publisher-more-details',
  templateUrl: './publisher-more-details.component.html',
  styleUrls: ['./publisher-more-details.component.scss']
})
export class PublisherMoreDetailsComponent implements OnInit {

  publisherMoreDetails: FormGroup = this.formBuilder.group
    (
      {
        mobile: [null, Validators.required],
        panNo:[null, Validators.required],
        aadharNo:[null, Validators.required],
        bankName:[null, Validators.required],
        branchName:[null, Validators.required],
        accountNo:[null, Validators.required],
        ifscCode:[null, Validators.required]
      }
    );

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
