import { Component, OnInit, ViewChild } from '@angular/core';
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
      categoryName: 'IT'
    },
    {
      categoryId: 2,
      categoryName: 'Commerce'
    }
  ]

  subCategoriesData: any[] = [
    {
      categoryId: 1,
      subCategoryId: 1,
      subCategoryName: 'JAVA'
    },
    {
      categoryId: 1,
      subCategoryId: 2,
      subCategoryName: 'C++'
    },
    {
      categoryId: 2,
      subCategoryId: 1,
      subCategoryName: 'Accountancy'
    },
    {
      categoryId: 2,
      subCategoryId: 2,
      subCategoryName: 'Principle of Management'
    }
  ]

  selectedSubCategories: any[] = [];
  selectedCategories: any[] = [];

  userMoreDetails: FormGroup = this.formBuilder.group
    (
      {
        mobile: [null, Validators.required],
        choosedCategories: [this.selectedCategories, Validators.required],
        choosedSubCategories: [null, Validators.required]
      }
    );

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {

  }

  removeCategory(selectedCategory: any) {
    console.log(selectedCategory)
    this.selectedCategories.splice(this.selectedCategories.indexOf(selectedCategory), 1)
  }


  categorySelected(value: number) {
    let category = this.categoriesData.find(x => x.categoryId == value)
    this.selectedCategories.push(category)
    console.log(this.userMoreDetails.controls['choosedCategories'].value)
  }


}
