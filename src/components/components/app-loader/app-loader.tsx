"use client";

import React from "react";
import styles from "./app-loader.module.scss";
import {useApp} from "@/src/app/contexts/AppContext";

export const AppLoader = () => {
    const {isLoading} = useApp();
    return isLoading ? <div className={styles.layout}>
            <span className={styles.label}>Loading...</span>
        </div> : null;
};