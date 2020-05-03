import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { AdminService } from "../../services/admin/admin.service";
import { AddUpdateCategoriesComponent } from "../../admin-components/add-update-categories/add-update-categories.component";
import { MatDialog } from "@angular/material/dialog";
import { SubjectCategory } from '../../shared/interfaces/category.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-manage-categories",
  templateUrl: "./manage-categories.component.html",
  styleUrls: ["./manage-categories.component.scss"]
})
export class ManageCategoriesComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";
  currentPage: number = 0;
  limit: number = 20;

  constructor(
    public authenticationService: AuthenticationService,
    public adminService: AdminService,
    private dialog: MatDialog,
    private title: Title
  ) {}

  ngOnInit() {
    
    this.adminService.allCategories = [];
    this.adminService.getAllCategories({pageNo: this.currentPage, limit: this.limit});
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  nextPage() {
    this.currentPage += 1;
    if (this.adminService.allCategories[this.currentPage]){
      this.adminService.getAllCategories({pageNo: this.currentPage, limit: this.limit});
    }
  }

  prevPage() {
    this.currentPage -= 1;
  }

  addUpdateCategoriesDialog(category: SubjectCategory, index: number) {
    const alertBox = this.dialog.open(AddUpdateCategoriesComponent, {
      minWidth: "40%",
      maxWidth: "80%",
      data: {
        category: category
      }
    });
    alertBox.afterClosed().subscribe((data: any) => {
      if (data && data.status) this.currentPage = 0;
    });
  }
  deleteCategories(category: SubjectCategory) {
    this.adminService.deleteCategories(category);
    let page = this.adminService.allCategories[this.currentPage];
    page.splice(page.indexOf(category), 1);
    this.currentPage = 0;
  }
}
