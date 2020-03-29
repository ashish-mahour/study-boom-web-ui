import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
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
import { SubjectSubCategory, SubjectCategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: "app-user-edit-details",
  templateUrl: "./user-edit-details.component.html",
  styleUrls: ["./user-edit-details.component.scss"]
})
export class UserEditDetailsComponent implements OnInit {
  filteredSubCategories: SubjectSubCategory[] = [];
  selectedSubCategories: number[] = [];
  selectedCategories: number[] = [];
  selectedSubCategoriesObjects: SubjectSubCategory[] = [];
  selectedCategoriesObjects: SubjectCategory[] = [];
  allCategories: SubjectCategory[] = []

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
    private translateService: TranslateService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.title.setTitle("Edit Details - Student");
    this.autoSelectCategories();
  }

  async autoSelectCategories() {
    await this.authenticationService.getAllCategories();
    this.allCategories = JSON.parse(JSON.stringify(this.authenticationService.allCategories))
    const choosedSubCategories = this.authenticationService.userDetails
      .userIdFromStudent.studentIdToChoosenSubCategories;
    console.log(choosedSubCategories)
    if (choosedSubCategories.length > 0) {
      choosedSubCategories.forEach(choosedSubCategory => {
        console.log(choosedSubCategory)
        this.authenticationService.allCategories.forEach(x => {
          if (!x) {
            return;
          }
          let subCategory = x.subjectCategoryIdToSubCategory.find(y => choosedSubCategory.subjectSubCategoryIdToChoosenSubCategories && y.id === choosedSubCategory.subjectSubCategoryIdToChoosenSubCategories.id);
          if (subCategory) {
            this.categorySelected(x.id)
            this.subCategorySelected(subCategory.id)
          }
        })
      })
    }
  }

  removeCategory(selectedCategory: SubjectCategory) {
    this.allCategories.push(selectedCategory);

    let subCategories = selectedCategory.subjectCategoryIdToSubCategory;
    subCategories.forEach(x => {
      if (this.selectedSubCategories.includes(x.id)) {
        this.selectedSubCategories.splice(this.selectedSubCategories.indexOf(x.id), 1)
        this.selectedSubCategoriesObjects.splice(this.selectedSubCategoriesObjects.indexOf(x), 1)
      }
      this.filteredSubCategories.splice(this.filteredSubCategories.indexOf(x), 1)
    });

    this.selectedCategories.splice(this.selectedCategories.indexOf(selectedCategory.id), 1)
    this.selectedCategoriesObjects.splice(this.selectedCategoriesObjects.indexOf(selectedCategory), 1)
  }

  categorySelected(value: number) {
    let category = this.allCategories.find(
      x => x && x.id === value
    );
    if(!category)
      return;
    this.zone.run(() => {
      this.selectedCategories.push(value);
      this.selectedCategoriesObjects.push(category);
      let subCategories = category.subjectCategoryIdToSubCategory;
      subCategories.forEach(x => this.filteredSubCategories.push(x));
      this.allCategories.splice(this.allCategories.indexOf(category), 1)
    })
  }

  clearCategory(event: MatChipInputEvent) {
    if (!this.categoryList.isOpen) {
      const input = event.input;

      if (input) {
        input.value = "";
      }
    }
  }

  removeSubCategory(selectedCategory: SubjectSubCategory) {
    this.zone.run(() => {
      this.filteredSubCategories.push(selectedCategory);
      this.selectedSubCategories.splice(this.selectedSubCategories.indexOf(selectedCategory.id), 1)
      this.selectedSubCategoriesObjects.splice(this.selectedSubCategoriesObjects.indexOf(selectedCategory), 1)
    })
  }

  subCategorySelected(value: number) {
    this.zone.run(() => {
      this.selectedSubCategories.push(value);
      let subCategory = this.filteredSubCategories.find(x => x && x.id == value);
      if(!subCategory)
        return;
      this.selectedSubCategoriesObjects.push(subCategory);
      this.filteredSubCategories.splice(this.filteredSubCategories.indexOf(subCategory), 1)
    })
  }

  clearSubCategory(event: MatChipInputEvent) {
    if (!this.subCategoryList.isOpen) {
      const input = event.input;

      if (input) {
        input.value = "";
      }
    }
  }

  availableCategories() {
    let categoryMsg = "<span>"
    this.authenticationService.allCategories.forEach((category, i) => {
      categoryMsg += "<b>" + category.name + (i !== (this.authenticationService.allCategories.length - 1) ? " - " : " ") + "</b>"
    })
    categoryMsg += "</span>"
    this.dialog.open(AlertBoxComponent, {
      minWidth: "25%",
      maxWidth: "60%",
      data: { type: "success", message: categoryMsg }
    });
  }

  availableSubCategories() {
    let categoryMsg = "<span>"
    this.authenticationService.allCategories.forEach(category => {
      categoryMsg += "<b>" + category.name + "</b> ( "
      category.subjectCategoryIdToSubCategory.forEach((subCategory, i) => categoryMsg += subCategory.name + (i !== (category.subjectCategoryIdToSubCategory.length - 1) ? " - " : " "))
      categoryMsg += ") <br>"
    })
    categoryMsg += "</span>"
    this.dialog.open(AlertBoxComponent, {
      minWidth: "35%",
      maxWidth: "60%",
      data: {
        type: "success",
        message: categoryMsg
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
