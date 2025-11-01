import { Meta, StoryObj } from "@storybook/nextjs";
import {
    TransportRequirementsDetail
} from "@/src/components/compositions/transport-requirements/transport-requirements-detail";
import {getRandomTransportRequirements} from "@/dataGenerator/transportRequirements";

const meta: Meta<typeof TransportRequirementsDetail> = {
    component: TransportRequirementsDetail,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof TransportRequirementsDetail> = {
    render: (args) => <TransportRequirementsDetail
        {...args}
        requirements={getRandomTransportRequirements()}
    />,
    args: {}
};