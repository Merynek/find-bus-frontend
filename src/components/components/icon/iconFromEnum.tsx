import React from "react";
import {IconType} from "@/src/enums/icon.enum";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import {SvgIconProps} from "@mui/material";

interface IIconFromEnumProps {
    icon: IconType;
    options?: SvgIconProps;
}

export const IconFromEnum = (props: IIconFromEnumProps) => {
    const {icon, options} = props;

    switch (icon) {
        case IconType.CHECK:
            return <CheckIcon {...options} />;
        case IconType.CLOSE:
            return <CloseIcon {...options} />;
        case IconType.CALENDAR_MONTH:
            return <CalendarMonthIcon {...options} />;
        case IconType.MENU:
            return <MenuIcon {...options} />;
        case IconType.ARROW_LEFT:
            return <ArrowLeftIcon {...options} />;
        case IconType.ARROW_UP:
            return <ArrowUpIcon {...options} />;
        case IconType.ARROW_DOWN:
            return <ArrowDownIcon {...options} />;
        case IconType.REMOVE:
            return <RemoveIcon {...options} />;
        case IconType.LOCATION_ON:
            return <LocationOnIcon {...options} />;
        case IconType.ADD:
            return <AddIcon {...options} />;
        case IconType.PERSON:
            return <PersonIcon {...options} />;
        case IconType.MAP:
            return <MapIcon {...options} />;
        case IconType.STAR:
            return <StarIcon {...options} />;
        case IconType.STAR_BORDER:
            return <StarBorderIcon {...options} />;
    }
}
