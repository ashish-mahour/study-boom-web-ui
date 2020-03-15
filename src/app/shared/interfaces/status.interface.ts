export interface Page {
    limit: number;
    pageNo: number;
}

export interface CategoryStatus {
    statusCode: number;
    message: string;
    categoryId: number;
}

export interface AccountStatus {
    statusCode: number;
    message: string;
    userId: number;
}

export interface RequestsStatus {
    statusCode: number;
    message: string;
    userId: number;
}

export interface TestSeriesStatus {
    statusCode: number;
    message: string;
    testSeriesId: number;
}