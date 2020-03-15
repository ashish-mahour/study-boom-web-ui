import { TestSeriesRatings, StudentPerfromedTest, TestSeries } from './test-series.interface';
import { StudentChoosenSubjectSubCategory } from './category.interface';

export interface UserDetails {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
    type: string;
    profilePic: string;
    mobileNo: string;
    bankName: string;
    branchName: string;
    accountNo: string;
    ifscCode: string;
    isActivated: boolean;
    choosedCategories: number[];
    choosedSubCategories: number[];
}

export interface ChangePassword {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface Users {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
    type: string;
    profilePic: string;
    isActivated: boolean;
    userIdFromAdmin: Admin;
    userIdFromStudent: Student;
    userIdFromPublisher: Publisher
}

export interface Admin {
    id: number;
    fullName: string;
    username: string;
    email: string;
    mobile: number;
    registrationDate: Date;
    modifiedDate: Date
}

export interface Publisher {
    id: number;
    fullName: string;
    username: string;
    email: string;
    mobile: number;
    bankName: string;
    branch: string;
    accountNo: string;
    ifscCode: string;
    registrationDate: Date;
    modifiedDate: Date;
    uploadedByPublisherTestSeries: Array<TestSeries>;
}

export interface Student {
    id: number;
    fullName: string;
    username: string;
    email: string;
    mobile: number;
    registrationDate: Date;
    modifiedDate: Date;
    ratedByStudent: Array<TestSeriesRatings>;
    studentIdToChoosenSubCategories: Array<StudentChoosenSubjectSubCategory>;
    testSeriesPerformendByStudent: Array<StudentPerfromedTest>;
}