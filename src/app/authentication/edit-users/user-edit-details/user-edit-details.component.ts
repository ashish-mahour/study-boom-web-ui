import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AlertBoxComponent } from 'src/app/shared/alert-box/alert-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit-details',
  templateUrl: './user-edit-details.component.html',
  styleUrls: ['./user-edit-details.component.scss']
})
export class UserEditDetailsComponent implements OnInit {

  userType: string = 'STUDENT';

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

  userEditForm: FormGroup = this.formBuilder.group({
    fullname: [null, [Validators.required, Validators.pattern("[A-Za-z ]+")]],
    email: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")]],
    username: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+")]],
    password: [null, [Validators.required]],
    mobile: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
    choosedCategory: [null],
    choosedCategories: [this.selectedCategories, Validators.minLength(1)],
    choosedSubCategory: [null],
    choosedSubCategories: [this.selectedSubCategories, Validators.minLength(1)]

  })

  @ViewChild("categoryList", { static: false })
  categoryList: MatAutocomplete;

  @ViewChild("subCategoryList", { static: false })
  subCategoryList: MatAutocomplete;
  constructor(
    private formBuilder: FormBuilder,
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
        message: 'IT (Java and C++) <br> Science (Physics, Chemistry and Biology) <br> Commerce (Accountancy and Principles of Management)'
      }
    })
  }


  editProfile() {

  }
}
