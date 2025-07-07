import React, {FunctionComponent} from "react";
import styles from "./tooltip.module.scss";
import MTooltip from '@mui/material/Tooltip';
import {ValidationState} from "../inputs/inputEnum";
import {cn} from "@/src/utils/common";

export type TooltipPlacement =
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';

export interface ITooltipProps {
    children: React.ReactElement;
    message?: string;
    placement?: TooltipPlacement;
    open?: boolean;
    arrow?: boolean;
    validationState?: ValidationState;
}

export const Tooltip: FunctionComponent<ITooltipProps> = (props) => {
    const {children, message, placement, arrow, open, validationState} = props;
    const openVal = open === undefined ? undefined : open;

    const getArrowStyle = () => {
        switch (validationState) {
            case ValidationState.ERROR:
                return styles.arrowError;
            case ValidationState.WARNING:
                return styles.arrowWarning;
            case ValidationState.SUCCESS:
                return styles.arrowSuccess;
            default: return styles.arrow;
        }
    }

    const getTooltipStyle = () => {
        switch (validationState) {
            case ValidationState.ERROR:
                return styles.tooltipError;
            case ValidationState.WARNING:
                return styles.tooltipWarning;
            case ValidationState.SUCCESS:
                return styles.tooltipSuccess;
            default: return styles.tooltip;
        }
    }

    return message ? <MTooltip
        classes={{
            arrow: getArrowStyle(),
            tooltip: getTooltipStyle()
        }}
        disableInteractive
        className={cn(styles.fake)}
        title={message}
        placement={placement || 'top'}
        arrow={arrow}
        open={openVal}
    ><div>{children}</div>
    </MTooltip> : children;
};