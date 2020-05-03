import { Publisher, Student } from './users.interfaces';
import { SubjectSubCategory } from './category.interface';

export interface TestSeriesDetailsForPublisher {
    testSeriesId: number;
    testSeriesName: string;
    categoryId: number;
    subCategoryId: number;
    totalQuestions: number;
    totalMarks: number;
    durationMax: number;
    passingMarks: number;
    price: number;
    isVisible: boolean,
    publisherId: number;
    testSeriesQuestions: Array<TestSeriesQuestion>;
}

export interface TestSeriesDetailsForAdmin {
    testSeriesId: number;
    testSeriesName: string;
    categoryId: number;
    subCategoryId: number;
    totalQuestions: number;
    totalMarks: number;
    durationMax: number;
    passingMarks: number;
    price: number;
    isVisible: boolean,
    adminId: number;
    testSeriesQuestions: Array<TestSeriesQuestion>;
}

export interface TestSeriesQuestion {
    questionId: number;
	questionText: string;
	answerText: string;
	choice1: string;
	choice2: string;
	choice3: string;
	choice4: string;
}

export interface TestSeries {
    id: number;
    uploadedByPublisher: Publisher;
    name: string;
    subjectSubCategoryIdToTestSeries: SubjectSubCategory;
    totalQuestions: number;
    durationMin: number;
    totalMarks: number;
    passingMarks: number;
    price: number;
    isVisible: boolean,
    createdDate: Date;
    modifiedDate: Date;
    testSeriesIdToTestSeriesData: Array<TestSeriesData>;
    testSeriesIdToRatings: Array<TestSeriesRatings>;
    testSeriesPerformedByStudents: Array<StudentPerfromedTest>
}

export interface TestSeriesData {
    id: number;
    questionText: string;
    answerText: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
}

export interface TestSeriesRatings {
    id: number;
    difficulty: number;
    questionsQuality: number;
    answersQuality: number;
    price_rating: number;
    overallRatings: number;
}

export interface StudentPerfromedTest {
    id: number;
    performendByStudent: Student;
    testSeriesPerformed: TestSeries;
    attemped: number;
    unattemped: number;
    totalScore: number;
    timeTaken: number;
    performedAt: Date;
}