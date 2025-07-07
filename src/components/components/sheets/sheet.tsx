import {observer} from "mobx-react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import styles from "./sheet.module.scss";
import React, {useEffect} from "react";
import {useBean} from "ironbean-react";
import {DeviceManager} from "@/src/singletons/device-manager";
import {AppManager} from "@/src/singletons/app-manager";
import {FontSize, Text} from "../texts/text/text";

export interface ISheetComponentProps {
    open: boolean;
    onClose: () => void;
    onOpen?: () => void;
    children: React.ReactNode;
    label?: string;
    isFullScreen?: boolean;
    bottomContent?: React.ReactNode;
}

export const SheetComponent = observer((props: ISheetComponentProps) => {
    const {open, onClose, label, children, isFullScreen, bottomContent, onOpen} = props;
    const _deviceManager = useBean(DeviceManager);
    const _appManager = useBean(AppManager);
    useEffect(() => {
        _appManager.sheetOpened = open;
    }, [open])

    return <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {
            onOpen && onOpen();
        }}
        disableSwipeToOpen={true}
        disableBackdropTransition={true}
        disableDiscovery={_deviceManager.isIOSDevice}
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
});