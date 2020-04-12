import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateRequestsComponent } from 'src/app/shared/add-update-requests/add-update-requests/add-update-requests.component';

@Component({
  selector: 'app-publisher-requests',
  templateUrl: './publisher-requests.component.html',
  styleUrls: ['./publisher-requests.component.scss']
})
export class PublisherRequestsComponent implements OnInit {

  height: string = window.innerHeight - 250 + "px";
  
  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  @HostListener("window:resize")
  onResizeScreen() {
    this.height = window.innerHeight - 280 + "px";
  }

  addNewRequest() {
    const alertBox = this.dialog.open(AddUpdateRequestsComponent, {
      minWidth: "40%",
      maxWidth: "80%",
      data: {
        request: null
      }
    })
    alertBox.afterClosed().subscribe((data: any) => {
      if (data && data.status) {
        
      }
    });
  }
}
