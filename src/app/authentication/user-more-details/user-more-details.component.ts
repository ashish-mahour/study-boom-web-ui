import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-more-details',
  templateUrl: './user-more-details.component.html',
  styleUrls: ['./user-more-details.component.scss'],

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
    },
    {
      categoryId: 3,
      categoryName: 'Science'
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
      subCategoryId: 3,
      subCategoryName: 'Accountancy'
    },
    {
      categoryId: 2,
      subCategoryId: 3,
      subCategoryName: 'Principle of Management'
    },
    {
      categoryId: 3,
      subCategoryId: 5,
      subCategoryName: 'Physics'
    },
    {
      categoryId: 3,
      subCategoryId: 6,
      subCategoryName: 'Biology'
    },
    {
      categoryId: 3,
      subCategoryId: 7,
      subCategoryName: 'Chemistry'
    }
  ]

  filteredSubCategories: any[] = [];
  selectedSubCategories: any[] = [];
  selectedCategories: any[] = [];

  @ViewChild("categoryList", { static: false })
  categoryList: MatAutocomplete;

  @ViewChild("subCategoryList", { static: false })
  subCategoryList: MatAutocomplete;

  userMoreDetails: FormGroup = this.formBuilder.group
    (
      {
        mobile: [null, Validators.required],
        choosedCategory: [null],
        choosedCategories: [this.selectedCategories, Validators.minLength(1)],
        choosedSubCategory: [null],
        choosedSubCategories: [this.selectedSubCategories, Validators.minLength(1)]
      }
    );

  constructor(
    private loadingService: LoadingAnimServiceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }


  ngOnInit() {

  }

  removeCategory(selectedCategory: any) {
    this.selectedCategories.splice(this.selectedCategories.indexOf(selectedCategory), 1)
    this.categoriesData.push(selectedCategory)
    let filteredSubCategoriesById: any[] = this.subCategoriesData.filter(x => x.categoryId == selectedCategory.categoryId);
    filteredSubCategoriesById.forEach(x => {
      this.filteredSubCategories.splice(this.filteredSubCategories.indexOf(x), 1)
    }
    );
    let filteredSelectedSubCategoriesById: any[] = this.selectedSubCategories.filter(x => x.categoryId == selectedCategory.categoryId);
    filteredSelectedSubCategoriesById.forEach(x => {
      this.selectedSubCategories.splice(this.selectedSubCategories.indexOf(x), 1)
    }
    );
  }


  categorySelected(value: number) {
    let category = this.categoriesData.find(x => x.categoryId == value)
    this.selectedCategories.push(category)
    this.categoriesData.splice(this.categoriesData.indexOf(category), 1)
    let filteredSubCategoriesById: any[] = this.subCategoriesData.filter(x => x.categoryId == value);
    filteredSubCategoriesById.forEach(x => this.filteredSubCategories.push(x));
  }

  clearCategory(event: MatChipInputEvent) {
    if (!this.categoryList.isOpen) {
      const input = event.input;

      if (input) {
        input.value = '';
      }
    }
  }

  removeSubCategory(selectedCategory: any) {
    this.selectedSubCategories.splice(this.selectedSubCategories.indexOf(selectedCategory), 1);
    this.filteredSubCategories.push(selectedCategory);
  }


  subCategorySelected(value: number) {
    let subCategory = this.filteredSubCategories.find(x => x.subCategoryId == value)
    this.selectedSubCategories.push(subCategory)
    this.filteredSubCategories.splice(this.filteredSubCategories.indexOf(subCategory), 1);
  }

  clearSubCategory(event: MatChipInputEvent) {
    if (!this.subCategoryList.isOpen) {
      const input = event.input;

      if (input) {
        input.value = '';
      }
    }
  }

  skipTheStepAction() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: '25%',
      maxWidth: '60%',
      data: { type: 'warn', message: 'All the details is nessasary for getting results ! Skipping the step means you can enter it later for dashboard purpuses!!' }
    })
  }

  saveDetails() {
    let userAllDetails: any = this.userMoreDetails.value;
    delete userAllDetails.choosedCategory;
    delete userAllDetails.choosedSubCategory;
    console.log(userAllDetails)
  }

  availableCategories() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: '25%',
      maxWidth: '60%',
      data: { type: 'success', message: 'IT, Science and Commerce' }
    })
  }

  availableSubCategories() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: '25%',
      maxWidth: '60%',
      data: { 
        type: 'success', 
        message: 'IT (Java and C++) <br> Science (Physics, Chemistry and Biology) <br> Commerce (Accountancy and Principles of Management)' }
    })
  }

}
