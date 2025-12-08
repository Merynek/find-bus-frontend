import {Notifications} from "@/src/components/compositions/notifications/notifications";
import {Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Notifications> = {
    component: Notifications,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof Notifications> = {
    render: (args) => <Notifications
        {...args}
        notifications={[]}
    />,
    args: {}
};