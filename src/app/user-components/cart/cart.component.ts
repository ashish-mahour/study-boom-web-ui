import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
