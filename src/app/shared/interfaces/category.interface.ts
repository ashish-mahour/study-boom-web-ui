export interface CategoryDetails {
    categoryId: number;
    categoryName: string;
    subCategories: Array<SubCategoryDetails>
}

export interface SubCategoryDetails {
    subCategoryId: number;
    subCategoryName: string;
}

export interface SubjectCategory {
    id: number;
    name: string;
    subjectCategoryIdToSubCategory: Array<SubjectSubCategory>;
}

export interface SubjectSubCategory {
    id: number;
    subjectCategoryIdToSubCategory: SubjectCategory,
    name: string;
}

export interface StudentChoosenSubjectSubCategory {
    id: number;
    subjectSubCategoryIdToChoosenSubCategories: SubjectSubCategory;
    priorityLevel: number;
}