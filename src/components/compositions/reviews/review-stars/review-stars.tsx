import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {Icon} from "@/src/components/components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

interface IReviewStarsProps {
    rating: number;
    onChange: (rating: number) => void;
    readonly?: boolean;
}

export const ReviewStars = (props: IReviewStarsProps) => {
    const {rating, onChange, readonly} = props;
    const maxStars = [1, 2, 3, 4, 5];

    return <LayoutFlexRow>
        {maxStars.map((starIndex) => (
            <ButtonClick
                isDisabled={readonly}
                key={starIndex}
                controlled={true}
                onClick={() => {
                    onChange(starIndex)
                }}
                type={ButtonType.BASE}
                size={ButtonSize.BY_CONTENT}
            >
                <Icon
                    icon={starIndex <= rating ? IconType.STAR : IconType.STAR_BORDER}
                />
            </ButtonClick>
        ))}
    </LayoutFlexRow>
}