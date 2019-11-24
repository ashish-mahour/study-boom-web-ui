import { Component, OnInit, HostListener } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { AdminService } from "src/app/services/admin/admin.service";

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
    private authenticationService: AuthenticationService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.getAllCategories(this.pageNo, this.limit);
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  nextPage() {
    this.currentPage += 1;
    this.pageNo += 1;
    if (this.adminService.allCategories[this.pageNo + 1])
      this.adminService.getAllCategories(this.pageNo, this.limit);
  }

  prevPage() {
    this.currentPage -= 1;
  }
}
