import {IconType} from "@/src/enums/icon.enum";
import {IconFromEnum} from "./iconFromEnum";
import React from "react";
import {SvgIconProps} from "@mui/material";

export interface IIconProps {
    icon: IconType;
    options?: SvgIconProps;
}

export const Icon = (props: IIconProps) => {
    return <IconFromEnum {...props} />
}