import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {ReviewStars} from "@/src/components/compositions/reviews/review-stars/review-stars";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {DetailReview} from "@/src/data/review/detail-review";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";
import {observer} from "mobx-react";
import {FlexGap} from "@/src/enums/layout.enum";

interface IReviewDetailFormProps {
    detailReview: DetailReview;
    readonly?: boolean;
}

export const ReviewDetailForm = observer((props: IReviewDetailFormProps) => {
    const {detailReview, readonly} = props;

    return <LayoutFlexColumn>
        <Text text={detailReview.criterion.toString()} fontSize={FontSize.BASE_14} />
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <ReviewStars
                readonly={readonly}
                rating={detailReview.rating}
                onChange={(val) => {
                    detailReview.rating = val;
                }}
            />
            <TextBox
                controlled={true}
                disabled={readonly}
                placeholder={readonly ? "text" : "Napište něco"}
                type={TextBoxType.TEXT}
                value={detailReview.comment}
                onChange={(val) => {
                    detailReview.comment = val;
                }}
            />
        </LayoutFlexColumn>
    </LayoutFlexColumn>
});