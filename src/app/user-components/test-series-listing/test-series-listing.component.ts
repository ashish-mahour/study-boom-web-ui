import { Component, OnInit, IterableDiffers, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { StudentPerfromedTest, TestSeries } from '../../shared/interfaces/test-series.interface';

@Component({
  selector: 'app-test-series-listing',
  templateUrl: './test-series-listing.component.html',
  styleUrls: ['./test-series-listing.component.scss']
})
export class TestSeriesListingComponent implements OnInit {

  height: string = (window.innerHeight - 250) + 'px';
  currentPage: number = 0;
  pageNo: number = 0;
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
    this.userService.getTestSeries(this.pageNo, this.limit, this.authenticationService.userDetails.userIdFromStudent.id);
  }

  @HostListener('window:resize')
  onResizeScreen() {
    this.height = (window.innerHeight - 250) + 'px';
  }

  performTestSeries(selectedTestIndex: number) {
    this.router.navigate(['/dashboard', { outlets: { 'dashboard-page-router': 'user-perform-test-series' } }]
      , { queryParams: { pageNo: this.pageNo, selectedTestIndex: selectedTestIndex } })
  }
  F
  nextPage() {
    this.currentPage += 1;
    if (this.userService.testData[this.pageNo + 1]) {
      this.pageNo += 1;
      this.userService.getTestSeries(this.pageNo, this.limit, this.authenticationService.userDetails.userIdFromStudent.id);
    }
  }

  prevPage() {
    this.currentPage -= 1;
  }

  getRatings(testSeriesIdToRatings: any[]): number {
    let totalRatings = 0;
    if (testSeriesIdToRatings.length === 0)
      return totalRatings;

    for (let testRating of testSeriesIdToRatings)
      totalRatings += testRating.overallRatings;

    return (totalRatings / testSeriesIdToRatings.length);
  }

  findStudentsPerformedTests(testSeries: Array<TestSeries>): Array<TestSeries> {
    return testSeries? testSeries.filter(x => x.testSeriesPerformedByStudents && x.testSeriesPerformedByStudents.find(y => y.performendByStudent && y.performendByStudent.id === this.authenticationService.userDetails.userIdFromStudent.id)) : []
  }
}
