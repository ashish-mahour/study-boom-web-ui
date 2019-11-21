import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.scss']
})
export class DashboardScreenComponent implements OnInit {

  userType: string = 'PUBLISHER';
  profileCompletion: number = 30;

  height: string = (window.innerHeight - 250) + 'px';

  testData: any[] = [
    {
      testId: 1,
      testName: 'IT Test',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "ACCEPTED"
    },
    {
      testId: 1,
      testName: 'IT Test',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "REJECTED"
    },
    {
      testId: 1,
      testName: 'Test',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "ACCEPTED"
    },
    {
      testId: 1,
      testName: 'AB',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "REJECTED"
    },
    {
      testId: 1,
      testName: 'AB',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "ACCEPTED"
    },
    {
      testId: 1,
      testName: 'AB',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "ACCEPTED"
    },
    {
      testId: 1,
      testName: 'AB',
      testType: 'MCQ',
      noOfQuestions: 50,
      duration: 60,
      totalMarks: 100,
      minMarks: 50,
      price: 0,
      uploadedBy: 'Ashish',
      status: "REJECTED"
    }
  ]

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

  @HostListener('window:resize')
  onResizeScreen() {
    this.height = (window.innerHeight - 280) + 'px';
  }

}
