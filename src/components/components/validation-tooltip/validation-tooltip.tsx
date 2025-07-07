import React from "react";
import {ValidationState} from "../inputs/inputEnum";
import {Tooltip, TooltipPlacement} from "../tooltip/tooltip";
import {observer} from "mobx-react";

export interface IValidationTooltipProps {
    children: React.ReactElement;
    state: ValidationState;
    message?: string;
    placement?: TooltipPlacement;
    open: boolean;
}

export const ValidationTooltip = observer((props: IValidationTooltipProps) => {
    const {state, message, children, open, placement} = props;

    return <Tooltip message={message} placement={placement} arrow={true} open={open} validationState={state}>
        {children}
    </Tooltip>
});