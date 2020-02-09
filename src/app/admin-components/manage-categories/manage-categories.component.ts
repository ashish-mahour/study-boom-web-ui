import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { AdminService } from "../../services/admin/admin.service";
import { AddUpdateCategoriesComponent } from "../../admin-components/add-update-categories/add-update-categories.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-manage-categories",
  templateUrl: "./manage-categories.component.html",
  styleUrls: ["./manage-categories.component.scss"]
})
export class ManageCategoriesComponent implements OnInit {
  height: string = window.innerHeight - 250 + "px";
  currentPage: number = 0;
  pageNo: number = 0;
  limit: number = 20;

  constructor(
    public authenticationService: AuthenticationService,
    public adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.adminService.allCategories = [];
    this.adminService.getAllCategories(this.pageNo, this.limit);
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  nextPage() {
    this.currentPage += 1;
    if (this.adminService.allCategories[this.pageNo + 1]){
      this.pageNo += 1;
      this.adminService.getAllCategories(this.pageNo, this.limit);
    }
  }

  prevPage() {
    this.currentPage -= 1;
  }

  addUpdateCategoriesDialog(category: any, index: number) {
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
  deleteCategories(category: any) {
    this.adminService.deleteCategories(category);
    let page: any[] = this.adminService.allCategories[this.currentPage];
    page.splice(this.adminService.allCategories.indexOf(category), 1);
    this.currentPage = 0;
  }
}
