import {Review} from "@/src/data/review/review";
import {observer} from "mobx-react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {ReviewStars} from "@/src/components/compositions/reviews/review-stars/review-stars";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";
import {ReviewDetailForm} from "@/src/components/compositions/reviews/review-detail-form/review-detail-form";
import {FlexGap} from "@/src/enums/layout.enum";

interface IOverallReviewFormProps {
    review: Review;
    readonly?: boolean;
}

export const OverallReviewForm = observer((props: IOverallReviewFormProps) => {
    const {review, readonly} = props;

    return <LayoutFlexColumn gap={FlexGap.TINY_8}>
        <Text text={"TARGET:" + review.targetType.toString()} fontSize={FontSize.L_32} />
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <ReviewStars
                rating={review.overallRating}
                onChange={(val) => {
                    review.overallRating = val;
                }}
            />
            <TextBox
                controlled={true}
                disabled={readonly}
                placeholder={readonly ? "text" : "Napište něco"}
                type={TextBoxType.TEXT}
                value={review.comment}
                onChange={(val) => {
                    review.comment = val;
                }}
            />
        </LayoutFlexColumn>
        {review.details.length > 0 && <LayoutFlexColumn>
            <Text text={"Podrobné reviews"} fontSize={FontSize.M_22} />
            <LayoutFlexColumn gap={FlexGap.TINY_8}>
                {review.details.map((d, i) => {
                    return <div key={i} style={{border: "2px solid black", padding: "8px"}}>
                        <ReviewDetailForm
                            readonly={readonly}
                            detailReview={d}
                        />
                    </div>
                })}
            </LayoutFlexColumn>
        </LayoutFlexColumn>}
    </LayoutFlexColumn>
});