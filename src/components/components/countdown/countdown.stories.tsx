import React from "react";
import {Countdown} from "./countdown";
import {Meta, StoryObj} from "@storybook/nextjs";
import {addMinutes} from "@/src/utils/date-time.common";

const meta: Meta<typeof Countdown> = {
    component: Countdown,
    args: {
        deadLine: addMinutes(new Date(), 1),
        onDone: () => {}
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof Countdown> = {
    render: (args) => <Countdown {...args} />
};