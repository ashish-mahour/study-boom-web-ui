import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

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

  testData: any = {}

  currentPosition: number = 0;

  questionsArray: any[] = [];

  studentPerformedTest: any = {
    studentId: null,
    testSeriesId: null,
    attempted: 0,
    unattemped: 0,
    timeTaken: 0,
    totalQuestions: 0,
    studentChoosedAnswers: []
  }

  constructor(
    private title: Title,
    public authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.testData = this.userService.testData[response.pageNo][response.selectedTestIndex]
      this.questionsArray = this.testData.testSeriesIdToTestSeriesData
      this.studentPerformedTest.studentId = this.authenticationService.userDetails.userIdFromStudent.id;
      this.studentPerformedTest.testSeriesId = this.testData.id;
      this.studentPerformedTest.unattemped = this.testData.totalQuestions
      this.studentPerformedTest.totalQuestions = this.testData.totalQuestions
      console.log(this.testData)
    })
    this.onResize();
    this.title.setTitle("Performing Test - StudyBoom")
    for (let i = 0; i < this.testData.totalQuestions; i++)
      this.questions.push({ questionNo: i + 1, attempted: false })
  }

  confirmTest() {
    this.isConfirmed = true;
    this.durationInSeconds = this.testData.durationMin * 60
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
    this.questions[this.currentPosition].attempted = true
    
    if (this.studentPerformedTest.attempted > 0)
      this.studentPerformedTest.attempted = this.studentPerformedTest.attempted + 1;

    if (this.studentPerformedTest.unattemped > 0)
      this.studentPerformedTest.unattemped = this.studentPerformedTest.unattemped - 1;

    if (this.questionsArray[this.currentPosition + 1]) {
      this.currentPosition++;
    }
  }

  goBack(position: number, attempted: boolean) {
    if (attempted)
      this.currentPosition = position - 1;
  }

  getRatings(testSeriesIdToRatings: any[]): number {
    let totalRatings = 0;
    if (testSeriesIdToRatings.length === 0)
      return totalRatings;

    for (let testRating of testSeriesIdToRatings)
      totalRatings += testRating.overallRatings;

    return (totalRatings / testSeriesIdToRatings.length);
  }

  testPerformed() {
    this.questionSubmited()
    this.studentPerformedTest.timeTaken = Math.floor(this.testData.durationMin - Math.round(this.durationInSeconds / 60))
    this.userService.testPerformed(this.studentPerformedTest)
  }

  answerSelected(answer: string) {
    let studentChoosedAnswers = this.studentPerformedTest.studentChoosedAnswers as any[];
    if (!studentChoosedAnswers[this.currentPosition])
      studentChoosedAnswers.push({ questionId: this.questionsArray[this.currentPosition].id, choosedAnswer: answer })
    else
      studentChoosedAnswers[this.currentPosition].choosedAnswer = answer;
  }
}
