import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-edit-details',
  templateUrl: './admin-edit-details.component.html',
  styleUrls: ['./admin-edit-details.component.scss']
})
export class AdminEditDetailsComponent implements OnInit {

  userType: string = 'ADMIN';
  
  constructor() { }

  ngOnInit() {
  }

}
