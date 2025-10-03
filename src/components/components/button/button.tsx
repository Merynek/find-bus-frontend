import React from "react";
import styles from "./button.module.scss";
import {cn} from "@/src/utils/common";
import {Link} from '@/src/i18n/navigation';
import {IRoute} from "@/src/enums/router.enum";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "@/src/components/components/icon/icon";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";

export enum ButtonType {
    BASE = "BASE",
    YELLOW = "YELLOW",
    BLACK = "BLACK"
}

export enum ButtonSize {
    BY_CONTENT = "BY_CONTENT",
    BUTTON_SIZE_M = "BUTTON_SIZE_M"
}

export interface IButtonProps {
    children?: React.ReactNode;
    label?: string;
    type: ButtonType;
    size: ButtonSize;
    rightIcon?: IconType;
    isDisabled?: boolean;
}

export interface ILinkButtonProps extends IButtonProps {
    route: IRoute;
    openInTab?: boolean;
    onClick?: (event: React.MouseEvent) => void;
}

interface IControlledClickButtonProps extends IButtonProps {
    controlled: true;
    onClick: (event: React.MouseEvent) => void;
}

interface IUncontrolledClickButtonProps extends IButtonProps {
    controlled: false;
    name?: string;
    value?: string;
}

export type IClickButtonProps = IControlledClickButtonProps | IUncontrolledClickButtonProps;

function getSizeForButton(buttonSize: ButtonSize): string {
    switch (buttonSize) {
        case ButtonSize.BY_CONTENT:
            return styles.buttonSizeByContent;
        case ButtonSize.BUTTON_SIZE_M:
            return styles.buttonSizeM;
    }
}

function getClassNameForButton(buttonType: ButtonType): string {
    switch (buttonType) {
        case ButtonType.BASE:
            return styles.buttonBase;
        case ButtonType.BLACK:
            return styles.buttonBlack ;
        case ButtonType.YELLOW:
            return styles.buttonYellow;
    }
}

export const ButtonClick = (props: IClickButtonProps) => {
    const {type, size, isDisabled, controlled} = props;

    const buttonProps = {
        disabled: isDisabled,
        className: cn(getClassNameForButton(type),getSizeForButton(size), isDisabled && styles.disabled)
    };

    if (controlled) {
        return <button
            onClick={props.onClick}
            {...buttonProps}
        >
            <ButtonContent {...props} />
        </button>
    }

    return <button
        type={"submit"}
        name={props.name}
        value={props.value}
        {...buttonProps}
    >
        <ButtonContent {...props} />
    </button>
}

export const ButtonLink = (props: ILinkButtonProps) => {
    const {size, type, onClick, route, openInTab, isDisabled} = props;
    const href = {
        pathname: route.route,
        params: route.params,
    };

    return <Link
        href={href as never}
        onClick={onClick}
        className={cn(getClassNameForButton(type), getSizeForButton(size), isDisabled && styles.disabled)}
        target={openInTab ? "_blank" : undefined}
    >
        <ButtonContent {...props} />
    </Link>
};

const ButtonContent = (props: IClickButtonProps|ILinkButtonProps) => {
    const {label, children, rightIcon, size} = props;
    const iconSize = size === ButtonSize.BUTTON_SIZE_M ? "14px" : "";

    return <LayoutFlexRow gap={FlexGap.SMALLEST_4} justifyContent={"space-between"} style={{width: "100%"}}>
        <LayoutFlexRow gap={FlexGap.SMALLEST_4}>
            {label}
            {children}
        </LayoutFlexRow>
        {rightIcon && <Icon
            options={{
                sx: {fontSize: iconSize}
            }}
            icon={rightIcon}
        />}
    </LayoutFlexRow>
}