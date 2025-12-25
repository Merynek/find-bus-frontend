"use client"

import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {ComboBox, IComboBoxItem} from "@/src/components/components/inputs/combo-box/combo-box";
import {ModerationStatus, type ReviewResponseDto} from "@/src/api/openapi";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";
import {reloadPage} from "@/src/utils/common";
import {useApp} from "@/src/context/AppContext";
import {ReviewService} from "@/src/services/ReviewService";
import { observer } from "mobx-react";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {ReviewConverter} from "@/src/converters/review/review-converter";

interface IAdminReviewItemProps {
    review: ReviewResponseDto;
}

export const AdminReviewItem = observer((props: IAdminReviewItemProps) => {
    const review = useInit(() => ReviewConverter.toInstance(props.review));
    const {showLoader, hideLoader} = useApp();

    const _createOption = (status: ModerationStatus): IComboBoxItem<string> => {
        return {
            label: status,
            value: status
        }
    }

    const _createOptions = (): IComboBoxItem<string>[] => {
        return Object.values(ModerationStatus).map(_createOption);
    }

    const options = _createOptions();

    return <LayoutFlexColumn>
        <OverallReviewForm
            review={review}
            readonly={true}
        />
        <ComboBox
            instanceId={"moderation status"}
            controlled={true}
            items={options}
            value={options.find(i => i.value === review.moderation)}
            onChange={(item) => {
                review.moderation = item.value as ModerationStatus;
            }}
        />
        <ButtonClick
            controlled={true}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
            label={"Change status"}
            onClick={async () => {
                showLoader();
                try {
                    await ReviewService.updateTripReview({
                        reviewId: review.id,
                        moderation: review.moderation
                    })
                    reloadPage();
                } catch (e) {
                    alert(getApiErrorMessage(e));
                }
                hideLoader();
            }}
        />
    </LayoutFlexColumn>
});