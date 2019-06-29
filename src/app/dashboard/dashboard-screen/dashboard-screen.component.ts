import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.scss']
})
export class DashboardScreenComponent implements OnInit {

  userType: string = 'STUDENT';
  profileCompletion: number = 30;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  editProfile() {
    if (this.userType === 'PUBLISHER')
      this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': ['publisher-edit-details'] } }])
    if (this.userType === 'ADMIN')
      this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': ['admin-edit-details'] } }])
    if (this.userType === 'STUDENT')
      this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': 'user-edit-details' } }])
  }

}
