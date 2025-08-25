import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, {useState} from "react";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import styles from "./context-menu.module.scss";

interface IContextMenuProps {
    opener: React.ReactNode;
    items: IContextItem[];
}

export interface IContextItem {
    label: string;
    leftContent?: React.ReactNode;
    onClick: () => void;
}

export const ContextMenu = (props: IContextMenuProps) => {
    const {items, opener} = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <button onClick={handleClick} className={styles.opener}>
            {opener}
        </button>
        <Menu
            anchorEl={anchorEl}
            id={"account-menu"}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
        >
            {items.map((item, index) => {
                return <MenuItem onClick={() => {
                    handleClose();
                    item.onClick();
                }} key={index}>
                    <LayoutFlexRow gap={FlexGap.SMALLEST_4} alignItems={"start"} justifyContent={"center"}>
                        {item.leftContent}
                        {item.label}
                    </LayoutFlexRow>
                </MenuItem>
            })}
        </Menu>
    </>
}