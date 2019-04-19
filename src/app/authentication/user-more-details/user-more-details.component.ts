import { Component, OnInit } from '@angular/core';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-more-details',
  templateUrl: './user-more-details.component.html',
  styleUrls: ['./user-more-details.component.scss']
})
export class UserMoreDetailsComponent implements OnInit {

  userMoreDetails: FormGroup = this.formBuilder.group
    (
      {
        fullname: [null],
        email: [null],
        username: [null],
        password: [null],
        usertype: [null],
        mobile: [null, Validators.required],
        choosedCategories: this.formBuilder.array([this.categoryArrayItem()], Validators.required)
      }
    );

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  categoryArrayItem(): FormGroup {
    return this.formBuilder.group
      (
        {
          categoryId: [null, Validators.required],
          subCategories: this.formBuilder.array([this.subCategoryArrayItem()], Validators.required)
        }
      )
  }

  subCategoryArrayItem(): FormGroup {
    return this.formBuilder.group
      (
        {
          subCategoryId: [null, Validators.required]
        }
      )
  }

  ngOnInit() {
    
  }

}
