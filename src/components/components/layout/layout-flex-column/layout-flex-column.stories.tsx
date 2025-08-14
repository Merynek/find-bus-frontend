import type { Meta, StoryObj } from '@storybook/nextjs';
import React from "react";
import {LayoutFlexColumn} from "./layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";

const meta: Meta<typeof LayoutFlexColumn> = {
    component: LayoutFlexColumn,
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

export const Default: StoryObj<typeof LayoutFlexColumn>  = {
    render: (args) => {
        return <LayoutFlexColumn {...args}>
            <div>item 1</div>
            <div>item 2</div>
            <div>item 3</div>
            <div>item 4</div>
        </LayoutFlexColumn>
    }
};
