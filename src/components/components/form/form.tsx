import React from "react";
import {observer} from "mobx-react";

export interface IFormProps {
    children: React.ReactNode;
    onSubmit: () => void;
}

export const Form = observer((props: IFormProps) => {
    const {children, onSubmit} = props;
    return <form
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}
        noValidate={true}
    >
        {children}
    </form>
});