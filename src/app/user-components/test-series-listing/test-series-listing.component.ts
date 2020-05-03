import { Component, OnInit, IterableDiffers, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { TestSeriesRatings } from '../../shared/interfaces/test-series.interface';

@Component({
  selector: 'app-test-series-listing',
  templateUrl: './test-series-listing.component.html',
  styleUrls: ['./test-series-listing.component.scss']
})
export class TestSeriesListingComponent implements OnInit {

  height: string = (window.innerHeight - 250) + 'px';
  allTestCurrentPageNo: number = 0;
  performedTestCurrentPageNo: number = 0;
  limit: number = 20;

  constructor(
    private title: Title,
    private router: Router,
    public authenticationService: AuthenticationService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.title.setTitle("Test Series - StudyBoom")
    this.userService.testData = [];
    this.userService.getAllTestSeries({ pageNo: this.allTestCurrentPageNo, limit: this.limit }, this.authenticationService.userDetails.userIdFromStudent.id);
  }

  @HostListener('window:resize')
  onResizeScreen() {
    this.height = (window.innerHeight - 250) + 'px';
  }

  tabChange(tabIndex: number) {
    if (tabIndex === 1) {
      this.performedTestCurrentPageNo = 0;
      this.userService.performedTestData = [];
      this.userService.getPerformedTestSeries({ pageNo: this.performedTestCurrentPageNo, limit: this.limit }, this.authenticationService.userDetails.userIdFromStudent.id)
    } else if (tabIndex === 0) {
      this.allTestCurrentPageNo = 0;
      this.userService.testData = [];
      this.userService.getAllTestSeries({ pageNo: this.allTestCurrentPageNo, limit: this.limit }, this.authenticationService.userDetails.userIdFromStudent.id);
    }
  }

  performTestSeries(selectedTestIndex: number) {
    this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': 'user-perform-test-series' } }]
      , { queryParams: { pageNo: this.allTestCurrentPageNo, selectedTestIndex: selectedTestIndex } })
  }

  nextAllTestPage() {
    this.allTestCurrentPageNo += 1;
    if (this.userService.testData[this.allTestCurrentPageNo]) {
      this.userService.getAllTestSeries({ pageNo: this.allTestCurrentPageNo, limit: this.limit }, this.authenticationService.userDetails.userIdFromStudent.id);
    }
  }

  prevPerformTestPage() {
    this.performedTestCurrentPageNo -= 1;
  }

  nextPerformTestPage() {
    this.performedTestCurrentPageNo += 1;
    if (this.userService.performedTestData[this.performedTestCurrentPageNo]) {
      this.userService.getAllTestSeries({ pageNo: this.performedTestCurrentPageNo, limit: this.limit }, this.authenticationService.userDetails.userIdFromStudent.id);
    }
  }

  prevAllTestPage() {
    this.allTestCurrentPageNo -= 1;
  }

  getRatings(testSeriesIdToRatings: TestSeriesRatings[]): number {
    let totalRatings = 0;
    if (testSeriesIdToRatings.length === 0)
      return totalRatings;

    for (let testRating of testSeriesIdToRatings)
      totalRatings += testRating.overallRatings;

    return Math.round(totalRatings / testSeriesIdToRatings.length);
  }

}
