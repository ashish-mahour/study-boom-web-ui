import { Component, OnInit, IterableDiffers, HostListener } from '@angular/core';

@Component({
  selector: 'app-test-series-listing',
  templateUrl: './test-series-listing.component.html',
  styleUrls: ['./test-series-listing.component.scss']
})
export class TestSeriesListingComponent implements OnInit {

  userType: string = 'STUDENT';

  height: string;

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

  constructor() { }

  ngOnInit() {
    this.height = (window.innerHeight - 200) + 'px';
  }

  @HostListener('window:resize')
  onResizeScreen(){
    this.height = (window.innerHeight - 200) + 'px';
  }

}
