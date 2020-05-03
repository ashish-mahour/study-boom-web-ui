import { Component, OnInit, Inject } from '@angular/core';
import { TestSeriesRatings } from '../interfaces/test-series-ratings.interface';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-ratings',
  templateUrl: './submit-ratings.component.html',
  styleUrls: ['./submit-ratings.component.scss']
})
export class SubmitRatingsComponent implements OnInit {

  testSeriesRatings: TestSeriesRatings = {
    studentId: null,
    testSeriesId: null,
    difficulty: 0,
    questionsQuality: 0,
    answersQuality: 0,
    priceRating: 0,
    overallRatings: 0
  }
  constructor(
    private userService: UserService,
    private matDialogRef: MatDialogRef<SubmitRatingsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { testSeriesId: number, studentId: number }
  ) { }

  ngOnInit(): void {
    this.testSeriesRatings.studentId = this.data.studentId
    this.testSeriesRatings.testSeriesId = this.data.testSeriesId
  }

  onRate(newValue: number, ratingType: "difficulty" | "questionsQuality" | "answersQuality" | "priceRating" | "overallRatings") {
    if (ratingType === "difficulty")
      this.testSeriesRatings.difficulty = newValue
    else if (ratingType === "questionsQuality")
      this.testSeriesRatings.questionsQuality = newValue
    else if (ratingType === "answersQuality")
      this.testSeriesRatings.answersQuality = newValue
    else if (ratingType === "priceRating")
      this.testSeriesRatings.priceRating = newValue
    else if (ratingType === "overallRatings")
      this.testSeriesRatings.overallRatings = newValue
  }
  
  submitRatings() {
    console.log(this.testSeriesRatings)
    this.userService.submitRatings(this.testSeriesRatings)
    this.matDialogRef.close()
  }

}
