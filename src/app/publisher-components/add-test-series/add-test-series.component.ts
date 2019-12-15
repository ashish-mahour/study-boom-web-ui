import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-test-series",
  templateUrl: "./add-test-series.component.html",
  styleUrls: ["./add-test-series.component.scss"]
})
export class AddTestSeriesComponent implements OnInit {
  testSeriesDetails: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.pattern("A-Za-z0-9 ")]],
    subCategoryId: [null],
    totalQuestions: [0],
    durationMin: [null, Validators.required],
    totalMarks: [null, [Validators.required, Validators.pattern("/d")]],
    passingMarks: [null, [Validators.required, Validators.pattern("/d")]],
    price: [null, [Validators.required, Validators.pattern("/d")]],
    testSeriesQuestions: this.formBuilder.array([], Validators.required)
  });

  testSeriesQuestion: FormGroup = this.formBuilder.group({
    questionText: [
      null,
      [Validators.required, Validators.pattern("A-Za-z0-9 ")]
    ],
    answerText: [null, [Validators.required, Validators.pattern("A-Za-z0-9 ")]],
    choice1: [null, [Validators.required, Validators.pattern("A-Za-z0-9 ")]],
    choice2: [null, [Validators.required, Validators.pattern("A-Za-z0-9 ")]],
    choice3: [null, [Validators.required, Validators.pattern("A-Za-z0-9 ")]],
    choice4: [null, [Validators.required, Validators.pattern("A-Za-z0-9 ")]]
  });

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}
}
