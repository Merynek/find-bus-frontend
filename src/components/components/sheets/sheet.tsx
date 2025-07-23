import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import styles from "./sheet.module.scss";
import React from "react";
import {FontSize, Text} from "../texts/text/text";
import {isIOS} from "react-device-detect";

export interface ISheetComponentProps {
    open: boolean;
    onClose: () => void;
    onOpen?: () => void;
    children: React.ReactNode;
    label?: string;
    isFullScreen?: boolean;
    bottomContent?: React.ReactNode;
}

export const SheetComponent = (props: ISheetComponentProps) => {
    const {open, onClose, label, children, isFullScreen, bottomContent, onOpen} = props;

    return <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {
            onOpen && onOpen();
        }}
        disableSwipeToOpen={true}
        disableBackdropTransition={true}
        disableDiscovery={isIOS}
        open={open}
        onClose={onClose}
        PaperProps={{
            sx: {
                maxHeight: isFullScreen ? "100%" : "75%",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                willChange: "transform"
            }
        }}
    >
        <div className={styles.layout}>
            <div className={styles.topLine} />
            {label && <div className={styles.sheetHeader}>
                <Text text={label} fontSize={FontSize.L_32} />
            </div>}
            {children}
            {bottomContent && <div className={styles.bottomContent}>{bottomContent}</div>}
        </div>
    </SwipeableDrawer>
};