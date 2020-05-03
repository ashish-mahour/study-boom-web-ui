export interface TestSeriesRatings {
    studentId: number;
	testSeriesId: number;
	difficulty: number;
	questionsQuality: number;
	answersQuality: number;
	priceRating: number;
	overallRatings: number;
}

export interface TestSeriesRatingsStatus {
    message: string;
    ratingId: number;
} 