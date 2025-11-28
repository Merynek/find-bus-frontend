import React, {useState} from "react";
import styles from "./popup.module.scss";
import Menu from "@mui/material/Menu";

interface IPopupProps {
    children: (close: () => void) => React.ReactNode;
    opener: React.ReactNode;
    id: string;
}

export const Popup = (props: IPopupProps) => {
    const {opener, id, children} = props;
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
            id={id}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
        >
            {children(handleClose)}
        </Menu>
    </>
}