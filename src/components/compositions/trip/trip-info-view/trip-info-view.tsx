import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TripInfo} from "@/src/data/trip/tripInfo";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";

interface ITripInfoProps {
    tripInfo: TripInfo;
}

export const TripInfoView = (props: ITripInfoProps) => {
    const {tripInfo} = props;
    return <LayoutFlexColumn>
        <Text text={"Name: " + tripInfo.name} fontSize={FontSize.M_24} />
        <Text text={"Persons: " + tripInfo.numberOfPersons} fontSize={FontSize.BASE_14} />
    </LayoutFlexColumn>
}