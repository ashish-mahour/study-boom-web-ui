import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-manage-test-series',
  templateUrl: './manage-test-series.component.html',
  styleUrls: ['./manage-test-series.component.scss']
})
export class ManageTestSeriesComponent implements OnInit {
  
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
