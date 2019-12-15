import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminService } from "../../services/admin/admin.service";

@Component({
  selector: "app-add-update-categories",
  templateUrl: "./add-update-categories.component.html",
  styleUrls: ["./add-update-categories.component.scss"]
})
export class AddUpdateCategoriesComponent implements OnInit {
  categoryForm: FormGroup = this.formBuilder.group({
    categoryId: [null],
    categoryName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern("[A-Za-z ]+")
      ])
    ],
    subCategories: this.formBuilder.array([this.subCategoryForm(undefined)])
  });

  subCategoryForm(subCategory: any): FormGroup {
    return this.formBuilder.group({
      subCategoryId: [subCategory ? subCategory.id : null],
      subCategoryName: [
        subCategory ? subCategory.name : null,
        Validators.compose([
          Validators.required,
          Validators.pattern("[A-Za-z ]+")
        ])
      ]
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private matDialogData: any,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<AddUpdateCategoriesComponent>
  ) {}

  ngOnInit() {
    this.setCategoryData();
  }

  setCategoryData() {
    let categoryData = this.matDialogData.category;
    if (!categoryData) return;
    this.categoryForm.controls["categoryId"].setValue(categoryData.id);
    this.categoryForm.controls["categoryName"].setValue(categoryData.name);
    let subCategoriesData: any[] = categoryData.subjectCategoryIdToSubCategory as any[];
    let subCategories: FormArray = this.categoryForm.controls[
      "subCategories"
    ] as FormArray;
    subCategories.clear()
    for (let subCategory of subCategoriesData) {
      subCategories.push(this.subCategoryForm(subCategory));
    }
  }

  addSubCategory() {
    let subCategories: FormArray = this.categoryForm.controls[
      "subCategories"
    ] as FormArray;
    subCategories.push(this.subCategoryForm(undefined));
  }

  removeSubCategory(i: number) {
    let subCategories: FormArray = this.categoryForm.controls[
      "subCategories"
    ] as FormArray;
    subCategories.removeAt(i);
  }
}
