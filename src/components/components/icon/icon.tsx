import {IconType} from "@/src/enums/icon.enum";
import {IconFromEnum} from "./iconFromEnum";
import {SvgIconOwnProps} from "@mui/material/SvgIcon/SvgIcon";
import React from "react";

export interface IIconProps {
    icon: IconType;
    options?: SvgIconOwnProps;
}

export const Icon = (props: IIconProps) => {
    return <IconFromEnum {...props} />
}