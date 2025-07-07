import React from "react";
import {observer} from "mobx-react";
import styles from "./app-loader.module.scss";

export interface IAppLoaderProps {
}

export const AppLoader = observer((props: IAppLoaderProps) => {
    return (
        <div className={styles.layout}>
            <span className={styles.label}>Loading...</span>
        </div>
    );
});