import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {LayoutFlexRow} from "./layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";

const meta: Meta<typeof LayoutFlexRow> = {
    component: LayoutFlexRow,
    args: {
        gap: FlexGap.TINY_8
    },
    argTypes: {
        gap: {
            options: Object.values(FlexGap),
            control: { type: 'select' }
        }
    }
};

export default meta;

export const Default: StoryObj<typeof LayoutFlexRow>  = {
    render: (args) => {
        return <LayoutFlexRow {...args}>
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
        </LayoutFlexRow>
    },
    args: {},
};
