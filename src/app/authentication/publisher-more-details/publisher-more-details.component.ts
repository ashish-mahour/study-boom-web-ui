import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        fullname: [null],
        email: [null],
        username: [null],
        password: [null],
        usertype: [null]
      }
    );

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
