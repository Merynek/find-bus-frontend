import React from "react";
import {Meta, StoryObj} from "@storybook/nextjs";
import {ContextMenu} from "@/src/components/components/context-menu/context-menu";

const meta: Meta<typeof ContextMenu> = {
    component: ContextMenu,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof ContextMenu> = {
    render: (args) => <ContextMenu
        {...args}
        id={"example"}
        items={[
            {
                label: "Delete",
                leftContent: <span>✕</span>,
                onClick: () => {
                    alert("Delete");
                }
            },
            {
                label: "Edit",
                leftContent: <span>✏️</span>,
                onClick: () => {
                    alert("Edit");
                }
            }
        ]}
        opener={<span>☰</span>}
    />
};