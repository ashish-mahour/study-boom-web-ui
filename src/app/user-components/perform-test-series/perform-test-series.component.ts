import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-perform-test-series',
  templateUrl: './perform-test-series.component.html',
  styleUrls: ['./perform-test-series.component.scss']
})
export class PerformTestSeriesComponent implements OnInit {

  isConfirmed: boolean = false;

  minutes: any;
  seconds: any;
  durationInSeconds: number;

  questions: any[] = [];
  questionCols: number = 25;

  test: any = {
    testId: 1,
    testName: 'AB',
    testType: 'MCQ',
    noOfQuestions: 50,
    duration: 0.3,
    totalMarks: 100,
    minMarks: 50,
    price: 0,
    uploadedBy: 'Ashish'
  }

  questionsArray: any[] = [
    {
      question: 'What is you name ? ',
      noOfChoices: 4,
      choice1: 'Abc',
      choice2: 'hsh',
      choice3: 'ashj',
      choice4: 'asjajs'
    },
    {
      question: 'What is you name ? ',
      noOfChoices: 0
    }
  ]

  currentPosition: number = 0;

  inputAnswers: string[] = [];

  constructor(
    private title: Title,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.onResize();
    this.title.setTitle("Performing Test - StudyBoom")
    for (let i = 0; i < this.test.noOfQuestions; i++)
      this.questions.push({ question: i + 1, attemped: false })
  }

  confirmTest() {
    this.isConfirmed = true;
    this.durationInSeconds = this.test.duration * 60
    this.startTimer();
  }

  startTimer(): any {
    let timer = setInterval(() => {
      this.minutes = Math.floor(this.durationInSeconds / 60)
      this.seconds = this.durationInSeconds % 60

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
      if (--this.durationInSeconds < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  @HostListener("window:resize")
  onResize() {
    this.questionCols = (window.innerWidth <= 500) ? 10 : 25;
  }

  questionSubmited() {
    this.questions[this.currentPosition].attemped = true
    if (this.questionsArray[this.currentPosition + 1]) {
      this.currentPosition++;
    }

  }
  goBack(position: number, attemped: boolean) {
    if (attemped)
      this.currentPosition = position - 1;
  }

}
