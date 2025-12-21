import type {ReviewCriterionType} from "@/src/api/openapi";

interface IDetailReview {
    criterion: ReviewCriterionType;
    rating: number;
    comment: string;
}

export class DetailReview {
    public criterion: ReviewCriterionType;
    public rating: number;
    public comment: string;

    constructor(data: IDetailReview) {
        this.criterion = data.criterion;
        this.rating = data.rating;
        this.comment = data.comment;
    }
}