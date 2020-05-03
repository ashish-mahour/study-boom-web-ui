import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { PublisherService } from "../../services/publisher/publisher.service";
import { SubjectSubCategory } from '../../shared/interfaces/category.interface';

@Component({
  selector: "app-add-test-series",
  templateUrl: "./add-test-series.component.html",
  styleUrls: ["./add-test-series.component.scss"]
})
export class AddTestSeriesComponent implements OnInit {
  selectedSubCategories: Array<SubjectSubCategory> = [];

  testSeriesDetailsForm: FormGroup = this.formBuilder.group({
    publisherId: [
      this.authenticationService.userDetails.userIdFromPublisher.id
    ],
    testSeriesId: [null],
    testSeriesName: [
      null,
      [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]
    ],
    categoryId: [null, Validators.required],
    subCategoryId: [null, Validators.required],
    totalQuestions: [1],
    durationMax: [null, Validators.required],
    totalMarks: [null, [Validators.required, Validators.pattern("[0-9]{1,3}")]],
    passingMarks: [
      null,
      [Validators.required, Validators.pattern("[0-9]{1,3}")]
    ],
    isVisible: [true],
    price: [null, [Validators.required, Validators.pattern("[0-9]{1,3}")]],
    testSeriesQuestions: this.formBuilder.array([], Validators.required)
  });

  questionPosition: number = -1;

  testSeriesQuestion(): FormGroup {
    return this.formBuilder.group({
      questionText: [null, [Validators.required]],
      answerText: [null, [Validators.required]],
      choice1: [null, [Validators.required]],
      choice2: [null, [Validators.required]],
      choice3: [null, [Validators.required]],
      choice4: [null, [Validators.required]]
    });
  }


  constructor(
    public publisherService: PublisherService,
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }


  testSeriesQuestions = (): FormArray => this.testSeriesDetailsForm.controls["testSeriesQuestions"] as FormArray;
  testSeriesQuestionsGroup = (i: number): FormGroup => this.testSeriesQuestions().controls[i] as FormGroup

  ngOnInit() {
    if (this.publisherService.allCategories.length === 0)
      this.publisherService.getAllCategories();
    this.addQuestion();
  }

  addQuestion() {
    let testSeriesQuestions: FormArray = this.testSeriesDetailsForm.controls[
      "testSeriesQuestions"
    ] as FormArray;
    testSeriesQuestions.push(this.testSeriesQuestion());
    this.testSeriesDetailsForm.controls["totalQuestions"].setValue(
      testSeriesQuestions.length
    );
    this.questionPosition = this.questionPosition + 1;
  }
  removeQuestion(index: number) {
    if (this.questionPosition !== 0)
      this.questionPosition = this.questionPosition - 1;
    let testSeriesQuestions: FormArray = this.testSeriesDetailsForm.controls[
      "testSeriesQuestions"
    ] as FormArray;
    testSeriesQuestions.removeAt(index);
    this.testSeriesDetailsForm.controls["totalQuestions"].setValue(
      testSeriesQuestions.length
    );
  }
  categorySelected(categoryID: number) {
    let category = this.publisherService.allCategories.find(
      x => x.id === categoryID
    );
    this.selectedSubCategories = category.subjectCategoryIdToSubCategory;
  }
}
