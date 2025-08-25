import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {RadioInput} from "@/src/components/components/inputs/radio-input/radio-input";

const meta: Meta<typeof RadioInput> = {
    component: RadioInput,
    args: { },
    argTypes: {
    },
};

export default meta;

export const Default: StoryObj<typeof RadioInput> = {
    render: () => {
        const radioOptions = [
            { id: 'option1', value: 'option1', label: 'Možnost 1' },
            { id: 'option2', value: 'option2', label: 'Možnost 2' },
            { id: 'option3', value: 'option3', label: 'Možnost 3' },
        ];

        return (
            <div className="flex flex-col gap-4">
                {radioOptions.map((option) => {
                    return <RadioInput
                        key={option.id}
                        id={option.id}
                        name={"my-radio-group"}
                        value={option.value}
                        label={option.label}
                    />
                })}
            </div>
        );
    },
    args: {}
};