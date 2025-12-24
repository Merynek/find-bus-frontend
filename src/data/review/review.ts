import type {ModerationStatus, ReviewTargetType, VisibilityStatus} from "@/src/api/openapi";
import {DetailReview} from "@/src/data/review/detail-review";
import { makeObservable, observable } from "mobx";

interface IReview {
    targetType: ReviewTargetType;
    visibility: VisibilityStatus;
    overallRating: number;
    comment: string;
    moderation: ModerationStatus;
    details: DetailReview[];
}

export class Review {
    public targetType: ReviewTargetType;
    public visibility: VisibilityStatus;
    @observable public overallRating: number;
    @observable public comment: string;
    public moderation: ModerationStatus;
    public details: DetailReview[];

    constructor(data: IReview) {
        this.targetType = data.targetType;
        this.visibility = data.visibility;
        this.overallRating = data.overallRating;
        this.comment = data.comment;
        this.moderation = data.moderation;
        this.details = data.details;
        makeObservable(this);
    }
}