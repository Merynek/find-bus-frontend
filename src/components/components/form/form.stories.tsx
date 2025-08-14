import React from "react";
import {Form} from "./form";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof Form> = {
    component: Form,
    args: {
        onSubmit: () => {}
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof Form> = {
    render: (args) => <Form {...args}>
        <input type={"text"} value={"val1"} onChange={() => {}} />
        <input type={"text"} value={"val2"} onChange={() => {}} />
        <input type={"text"} value={"val3"} onChange={() => {}} />
        <button>SUBMIT</button>
    </Form>,
    args: {}
};