import type {ReviewCriterionType} from "@/src/api/openapi";
import { makeObservable, observable } from "mobx";

interface IDetailReview {
    criterion: ReviewCriterionType;
    rating: number;
    comment: string;
}

export class DetailReview {
    public criterion: ReviewCriterionType;
    @observable public rating: number;
    @observable public comment: string;

    constructor(data: IDetailReview) {
        this.criterion = data.criterion;
        this.rating = data.rating;
        this.comment = data.comment;
        makeObservable(this);
    }
}