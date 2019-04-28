import { Component, OnInit } from '@angular/core';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-more-details',
  templateUrl: './user-more-details.component.html',
  styleUrls: ['./user-more-details.component.scss']
})
export class UserMoreDetailsComponent implements OnInit {

  categoriesData: any[] = [
    {
      categoryId: 1,
      categoryName: 'IT',
      subCategories: [
        {
          subCategoryId: 1,
          subCategoryName: 'JAVA'
        },
        {
          subCategoryId: 2,
          subCategoryName: 'C++'
        }
      ]
    },
    {
      categoryId: 2,
      categoryName: 'Commerce',
      subCategories: [
        {
          subCategoryId: 1,
          subCategoryName: 'Accountancy'
        },
        {
          subCategoryId: 2,
          subCategoryName: 'Principle of Management'
        }
      ]
    }
  ]

  userMoreDetails: FormGroup = this.formBuilder.group
    (
      {
        mobile: [null, Validators.required],
        choosedCategories: this.formBuilder.array(
          [
            this.categoryArrayItem()
          ]
        )
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
          categoryId: ['', Validators.required],
          subCategories: this.formBuilder.array(
            [
              this.subCategoryArrayItem()
            ]
          )
        }
      )
  }

  subCategoryArrayItem(): FormGroup {
    return this.formBuilder.group
      (
        {
          subCategoryId: ['', Validators.required]
        }
      )
  }

  ngOnInit() {
    console.log((this.userMoreDetails.controls['choosedCategories'] as FormArray).controls)
  }
  addCategory() {
    let categoryArray = this.userMoreDetails.controls['choosedCategories'] as FormArray;
    categoryArray.push(this.categoryArrayItem())
  }
  addSubCategory(i: number) {
    let categoryArray = this.userMoreDetails.controls['choosedCategories'] as FormArray;
    let categoryFormGroup = categoryArray.controls[i] as FormGroup;
    let subCategoryArray = categoryFormGroup.controls['subCategories'] as FormArray;
    subCategoryArray.push(this.subCategoryArrayItem())
  }

  categorySelected(value: number) {

  }

  removeCategory(i: number) {
    let categoryArray = this.userMoreDetails.controls['choosedCategories'] as FormArray;
    categoryArray.removeAt(i)
  }

  removeSubCategory(i: number, j: number) {
    let categoryArray = this.userMoreDetails.controls['choosedCategories'] as FormArray;
    let categoryFormGroup = categoryArray.controls[i] as FormGroup;
    let subCategoryArray = categoryFormGroup.controls['subCategories'] as FormArray;
    subCategoryArray.removeAt(j)
  }

}
