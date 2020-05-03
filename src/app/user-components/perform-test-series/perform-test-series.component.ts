import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { TestSeries, TestSeriesData } from 'src/app/shared/interfaces/test-series.interface';
import { StudentPerformedTestRequest } from 'src/app/shared/interfaces/users.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { SubmitRatingsComponent } from 'src/app/shared/submit-ratings/submit-ratings.component';

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

  questions: Array<{ questionNo: number, attempted: boolean }> = [];
  questionCols: number = 25;

  testData: TestSeries

  currentPosition: number = 0;

  questionsArray: Array<TestSeriesData> = [];

  studentPerformedTest: StudentPerformedTestRequest = {
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
    private userService: UserService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((response: { pageNo: number, selectedTestIndex: number }) => {
      this.testData = this.userService.testData[response.pageNo][response.selectedTestIndex]
      this.questionsArray = this.testData.testSeriesIdToTestSeriesData
      this.studentPerformedTest.studentId = this.authenticationService.userDetails.userIdFromStudent.id;
      this.studentPerformedTest.testSeriesId = this.testData.id;
      this.studentPerformedTest.unattemped = this.testData.totalQuestions
      this.studentPerformedTest.totalQuestions = this.testData.totalQuestions
      let questionNo = 0
      for (let question of this.questionsArray) {
        questionNo++
        this.studentPerformedTest.studentChoosedAnswers.push({ questionId: question.id, choosedAnswer: null })
        this.questions.push({ questionNo: questionNo, attempted: false })
      }
    })
    this.onResize();
    this.title.setTitle("Performing Test - StudyBoom")
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

  questionSubmited(isSubmitted: boolean) {
    if (!isSubmitted) {
      if (this.questionsArray[this.currentPosition + 1]) {
        this.currentPosition++;
      }
    }
  }

  goToQuestion(position: number) {
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
    this.questionSubmited(true)
    this.studentPerformedTest.timeTaken = this.testData.durationMin - Math.floor(this.durationInSeconds / 60)
    this.userService.testPerformed(this.studentPerformedTest).then(()=> {
      this.matDialog.open(SubmitRatingsComponent, {
        minWidth: "20%",
        maxWidth: "40%",
        data: {
          testSeriesId: this.studentPerformedTest.testSeriesId,
          studentId: this.studentPerformedTest.studentId
        }
      })
    })
  }

  answerSelected(answer: string) {
    if (this.studentPerformedTest.studentChoosedAnswers[this.currentPosition].choosedAnswer === null) {
      this.questions[this.currentPosition].attempted = true
      this.studentPerformedTest.attempted = this.studentPerformedTest.attempted + 1;
      if (this.studentPerformedTest.unattemped > 0) {
        this.studentPerformedTest.unattemped = this.studentPerformedTest.unattemped - 1;
      }
    }
    this.studentPerformedTest.studentChoosedAnswers[this.currentPosition].choosedAnswer = answer
  }
}
