import { Component, OnInit, IterableDiffers, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-series-listing',
  templateUrl: './test-series-listing.component.html',
  styleUrls: ['./test-series-listing.component.scss']
})
export class TestSeriesListingComponent implements OnInit {

  userType: string = 'STUDENT';

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
      uploadedBy: 'Ashish'
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
      uploadedBy: 'Ashish'
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
      uploadedBy: 'Ashish'
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
      uploadedBy: 'Ashish'
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
      uploadedBy: 'Ashish'
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
      uploadedBy: 'Ashish'
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
      uploadedBy: 'Ashish'
    }
  ]

  constructor(
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle("Test Series - StudyBoom")
  }

  @HostListener('window:resize')
  onResizeScreen() {
    this.height = (window.innerHeight - 250) + 'px';
  }

  performTestSeries() {
    this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': 'user-perform-test-series' } }])
  }

}
