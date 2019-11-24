import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-add-test-series',
  templateUrl: './add-test-series.component.html',
  styleUrls: ['./add-test-series.component.scss']
})
export class AddTestSeriesComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
