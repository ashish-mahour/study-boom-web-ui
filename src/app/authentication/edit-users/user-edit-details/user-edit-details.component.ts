import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { AlertBoxComponent } from "../../../shared/alert-box/alert-box.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import * as config from "../../../shared/config.json";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-user-edit-details",
  templateUrl: "./user-edit-details.component.html",
  styleUrls: ["./user-edit-details.component.scss"]
})
export class UserEditDetailsComponent implements OnInit {
  filteredSubCategories: any[] = [];
  selectedSubCategories: any[] = [];
  selectedCategories: any[] = [];
  selectedSubCategoriesObjects: any[] = [];
  selectedCategoriesObjects: any[] = [];

  userEditForm: FormGroup = this.formBuilder.group({
    fullname: [
      this.authenticationService.userDetails.fullName,
      [Validators.required, Validators.pattern("[A-Za-z ]+")]
    ],
    email: [
      this.authenticationService.userDetails.email,
      [
        Validators.required,
        Validators.pattern("[A-Za-z0-9]+[@][A-Za-z]+[.][A-Za-z]{2,3}")
      ]
    ],
    username: [
      this.authenticationService.userDetails.username,
      [Validators.required, Validators.pattern("[A-Za-z0-9]+")]
    ],
    password: [null, [Validators.required]],
    mobile: [
      this.authenticationService.userDetails.userIdFromStudent.mobile,
      [Validators.required, Validators.pattern("[0-9]{10}")]
    ],
    choosedCategory: [null],
    choosedCategories: [this.selectedCategories, Validators.minLength(1)],
    choosedSubCategory: [null],
    choosedSubCategories: [this.selectedSubCategories, Validators.minLength(1)]
  });

  @ViewChild("categoryList")
  categoryList: MatAutocomplete;

  @ViewChild("subCategoryList")
  subCategoryList: MatAutocomplete;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService,
    private router: Router,
    private title: Title,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.title.setTitle("Choose Categories - Student");
    this.autoSelectCategories();
  }

  autoSelectCategories() {
    if (this.authenticationService.allCategories.length === 0)
      this.authenticationService.getAllCategories();
    let choosedCategories = this.authenticationService.userDetails
      .userIdFromStudent.studentIdToChoosenSubCategories as any[];
    if (choosedCategories.length > 0) {
      for (let category of choosedCategories) {
        let subCategory = category.subjectSubCategoryIdToChoosenSubCategories;
        this.authenticationService.allCategories.find(x => {
          let subCategories = x.subjectCategoryIdToSubCategory as any[];
          if (subCategories.find(y => y.id === subCategory.id)) {
            this.categorySelected(x.id);
            this.subCategorySelected(subCategory.id);
          }
        });
      }
    }
  }

  removeCategory(selectedCategory: any) {
    this.authenticationService.allCategories.push(selectedCategory);

    let subCategories: any[] = selectedCategory.subjectCategoryIdToSubCategory;
    subCategories.forEach(x => {
      if (this.selectedSubCategories.includes(x.id)) {
        this.selectedSubCategories.splice(
          this.selectedSubCategories.indexOf(x.id),
          1
        );
        this.selectedSubCategoriesObjects.splice(
          this.selectedSubCategoriesObjects.indexOf(x),
          1
        );
      }
      this.filteredSubCategories.splice(
        this.filteredSubCategories.indexOf(x),
        1
      );
    });

    this.selectedCategories.splice(
      this.selectedCategories.indexOf(selectedCategory.id),
      1
    );
    this.selectedCategoriesObjects.splice(
      this.selectedCategoriesObjects.indexOf(selectedCategory),
      1
    );
  }

  categorySelected(value: number) {
    let category = this.authenticationService.allCategories.find(
      x => x.id == value
    );
    this.selectedCategories.push(value);
    this.selectedCategoriesObjects.push(category);
    let subCategories: any[] = category.subjectCategoryIdToSubCategory;
    subCategories.forEach(x => this.filteredSubCategories.push(x));
    this.authenticationService.allCategories.splice(
      this.authenticationService.allCategories.indexOf(category),
      1
    );
  }

  clearCategory(event: MatChipInputEvent) {
    if (!this.categoryList.isOpen) {
      const input = event.input;

      if (input) {
        input.value = "";
      }
    }
  }

  removeSubCategory(selectedCategory: any) {
    this.filteredSubCategories.push(selectedCategory);
    this.selectedSubCategories.splice(
      this.selectedSubCategories.indexOf(selectedCategory.id),
      1
    );
    this.selectedSubCategoriesObjects.splice(
      this.selectedSubCategoriesObjects.indexOf(selectedCategory),
      1
    );
  }

  subCategorySelected(value: number) {
    this.selectedSubCategories.push(value);
    let subCategory = this.filteredSubCategories.find(x => x.id == value);
    this.selectedSubCategoriesObjects.push(subCategory);
    this.filteredSubCategories.splice(
      this.filteredSubCategories.indexOf(subCategory),
      1
    );
  }

  clearSubCategory(event: MatChipInputEvent) {
    if (!this.subCategoryList.isOpen) {
      const input = event.input;

      if (input) {
        input.value = "";
      }
    }
  }

  skipTheStepAction() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: "25%",
      maxWidth: "60%",
      data: {
        type: "warn",
        message:
          "All the details is nessasary for getting results !<br> Skipping the step means you can enter it later for dashboard purpuses!!"
      }
    });
    this.router.navigateByUrl("/home");
  }

  availableCategories() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: "25%",
      maxWidth: "60%",
      data: { type: "success", message: "IT, Science and Commerce" }
    });
  }

  availableSubCategories() {
    this.dialog.open(AlertBoxComponent, {
      minWidth: "25%",
      maxWidth: "60%",
      data: {
        type: "success",
        message:
          "IT (Java and C++) <br> Science (Physics, Chemistry and Biology) <br> Commerce (Accountancy and Principles of Management)"
      }
    });
  }
  editProfile() {
    let userAllDetails: any = this.userEditForm.value;
    delete userAllDetails.choosedCategory;
    delete userAllDetails.choosedSubCategory;
    this.authenticationService.mofifiedUserDetails = userAllDetails;
    this.authenticationService.mofifiedUserDetails.mobileNo =
      userAllDetails.mobile;
    this.authenticationService.mofifiedUserDetails.password = btoa(
      userAllDetails.password
    );
    this.translateService
      .get("userTypes.student")
      .subscribe(
        (translation: string) =>
          (this.authenticationService.mofifiedUserDetails.type = translation)
      );
    this.authenticationService.mofifiedUserDetails.id = this.authenticationService.userDetails.id;
    this.authenticationService.modifyUsers(
      config.modifiedCommands.updateStudent
    );
    this.router.navigateByUrl("/dashboard");
  }
}
