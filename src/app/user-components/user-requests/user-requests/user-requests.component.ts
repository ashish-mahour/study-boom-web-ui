import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Requests } from '../../../shared/interfaces/requests.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateRequestsComponent } from '../../../shared/add-update-requests/add-update-requests/add-update-requests.component';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {

  height: string = window.innerHeight - 250 + "px";
  pageNo: number = 0
  limit: number = 20;

  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authenticationService.allRequestsByUser = []
    this.authenticationService.getRequestsByUser({ pageNo: this.pageNo, limit: this.limit });
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  addUpdateRequest(request: Requests) {
    const alertBox = this.dialog.open(AddUpdateRequestsComponent, {
      minWidth: "40%",
      maxWidth: "80%",
      data: {
        pageNo: this.pageNo, requestData: request
      }
    })
    alertBox.afterClosed().subscribe((data: any) => {
      if (data && data.status) {
        this.pageNo = 0
      }
    });
  }

  nextPage() {
    this.pageNo += 1;
    if (this.authenticationService.allRequestsByUser[this.pageNo + 1]){
      this.pageNo += 1;
      this.authenticationService.getRequestsByUser({ pageNo: this.pageNo, limit: this.limit });
    }
  }

  prevPage() {
    this.pageNo -= 1;
  }

}
