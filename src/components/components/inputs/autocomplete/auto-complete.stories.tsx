import React from "react";
import {AutoComplete, IAutoCompleteItem} from "./auto-complete";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof AutoComplete> = {
    component: AutoComplete,
    args: {
        autoFocus: false,
        isDisabled: false,
        emptyMessage: "Empty message",
        loadingMessage: "Loading Message",
        placeholder: "PlaceHolder"
    },
    argTypes: {
    },
};

export default meta;

export const Default: StoryObj<typeof AutoComplete> = {
    render: (args) => {
        const getFilteredItems = async (filter: string) => {
            return new Promise<IAutoCompleteItem<string>[]>((resolve) => {
                if (filter.length < 3) {
                    resolve([]);
                }
                setTimeout(() => {
                    resolve([
                        {
                            value: "1",
                            label: "1"
                        },
                        {
                            value: "2",
                            label: "2"
                        },
                        {
                            value: "3",
                            label: "3"
                        },
                    ]);
                }, 1500)
            });
        }

        return <AutoComplete
            {...args}
            getFilteredItems={getFilteredItems}
        />
    },
    args: {}
};