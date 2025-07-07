import React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {FileUploadInput} from "./file-upload-input";
import {DropFileType} from "@/src/enums/file-drop-type.enum";

const meta: Meta<typeof FileUploadInput> = {
    component: FileUploadInput,
    args: {
        type: [DropFileType.IMAGE],
        simple: false,
        onDrop: () => {}
    },
    argTypes: {}
};

export default meta;


export const Default: StoryObj<typeof FileUploadInput> = {
    render: (args) => <FileUploadInput {...args} />
};