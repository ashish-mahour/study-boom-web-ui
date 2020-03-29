import {
  Component,
  OnInit,
  ViewChild,
  NgZone
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
import { SubjectCategory, SubjectSubCategory } from '../../shared/interfaces/category.interface';

@Component({
  selector: "app-user-more-details",
  templateUrl: "./user-more-details.component.html",
  styleUrls: ["./user-more-details.component.scss"]
})
export class UserMoreDetailsComponent implements OnInit {
  userId: number;
  filteredSubCategories: SubjectSubCategory[] = [];
  selectedSubCategories: number[] = [];
  selectedCategories: number[] = [];
  selectedSubCategoriesObjects: SubjectSubCategory[] = [];
  selectedCategoriesObjects: SubjectCategory[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild("categoryList")
  categoryList: MatAutocomplete;

  @ViewChild("subCategoryList")
  subCategoryList: MatAutocomplete;

  allCategories: SubjectCategory[] = []

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
    private title: Title,
    private zone: NgZone
  ) {}

  async ngOnInit() {
    this.title.setTitle("Choose Categories - Student");
    await this.authenticationService.getAllCategories();
    this.allCategories = JSON.parse(JSON.stringify(this.authenticationService.allCategories))
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.userId = params.id;
    });
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
}
