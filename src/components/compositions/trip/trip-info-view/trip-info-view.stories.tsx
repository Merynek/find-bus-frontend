import {TripInfoView} from "@/src/components/compositions/trip/trip-info-view/trip-info-view";
import { Meta, StoryObj } from "@storybook/nextjs";
import {getRandomTripInfo} from "@/dataGenerator/trip";

const meta: Meta<typeof TripInfoView> = {
    component: TripInfoView,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof TripInfoView> = {
    render: (args) => <TripInfoView
        {...args}
        tripInfo={getRandomTripInfo()}
    />
};