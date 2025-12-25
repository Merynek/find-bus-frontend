import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {Review} from "@/src/data/review/review";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {ComboBox, IComboBoxItem} from "@/src/components/components/inputs/combo-box/combo-box";
import {type ModerationStatus} from "@/src/api/openapi";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";
import {AdminService} from "@/src/services/AdminService";
import {reloadPage} from "@/src/utils/common";

interface IAdminReviewItemProps {
    review: Review;
}

export const AdminReviewItem = (props: IAdminReviewItemProps) => {
    const {review} = props;

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
            value={options.find(i => i.value === reason)}
            onChange={(item) => {
                onChange(item.value as ModerationStatus);
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
                    await AdminService.updateTripReview({
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
}