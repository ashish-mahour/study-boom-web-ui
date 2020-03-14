import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { AlertBoxComponent } from "../../shared/alert-box/alert-box.component";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import * as config from "../../shared/config.json";
import { Title } from "@angular/platform-browser";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: "app-user-more-details",
  templateUrl: "./user-more-details.component.html",
  styleUrls: ["./user-more-details.component.scss"]
})
export class UserMoreDetailsComponent implements OnInit {
  userId: number;
  filteredSubCategories: any[] = [];
  selectedSubCategories: any[] = [];
  selectedCategories: any[] = [];
  selectedSubCategoriesObjects: any[] = [];
  selectedCategoriesObjects: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild("categoryList")
  categoryList: MatAutocomplete;

  @ViewChild("subCategoryList")
  subCategoryList: MatAutocomplete;

  userMoreDetails: FormGroup = this.formBuilder.group({
    mobile: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
    choosedCategory: [null],
    choosedCategories: [this.selectedCategories, Validators.minLength(1)],
    choosedSubCategory: [null],
    choosedSubCategories: [this.selectedSubCategories, Validators.minLength(1)]
  });

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public authenticationService: AuthenticationService,
    private tranlateService: TranslateService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("Choose Categories - Student");
    if (this.authenticationService.allCategories.length === 0)
      this.authenticationService.getAllCategories();
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.userId = params.id;
    });
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

  saveDetails() {
    let userAllDetails: any = this.userMoreDetails.value;
    delete userAllDetails.choosedCategory;
    delete userAllDetails.choosedSubCategory;
    this.authenticationService.mofifiedUserDetails = userAllDetails;
    this.tranlateService
      .get("userTypes.student")
      .subscribe(
        (translation: string) =>
          (this.authenticationService.mofifiedUserDetails.type = translation)
      );
    this.authenticationService.mofifiedUserDetails.id = this.userId;
    this.authenticationService.modifyUsers(
      config.modifiedCommands.updateStudent
    );
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
}
