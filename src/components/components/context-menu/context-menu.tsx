import MenuItem from '@mui/material/MenuItem';
import React from "react";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import {Popup} from "@/src/components/components/popup/popup";

interface IContextMenuProps {
    opener: React.ReactNode;
    items: IContextItem[];
    id: string;
}

export interface IContextItem {
    label: string;
    leftContent?: React.ReactNode;
    onClick: () => void;
}

export const ContextMenu = (props: IContextMenuProps) => {
    const {items, opener, id} = props;

    return <Popup opener={opener} id={id}>
        {(close) => (
            items.map((item, index) => {
                return <MenuItem onClick={() => {
                    item.onClick();
                    close();
                }} key={index}>
                    <LayoutFlexRow gap={FlexGap.SMALLEST_4} alignItems={"start"} justifyContent={"center"}>
                        {item.leftContent}
                        {item.label}
                    </LayoutFlexRow>
                </MenuItem>
            })
        )}
    </Popup>
}