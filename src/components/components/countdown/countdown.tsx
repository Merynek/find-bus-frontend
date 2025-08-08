"use client"

import React, {useRef, useState} from "react";
import styles from "./countdown.module.scss";
import {useUnmount, useMount} from "@/src/hooks/lifecycleHooks";

export interface ICountdownProps {
    deadLine: Date;
    onDone: () => void;
}

export const Countdown = (props: ICountdownProps) => {
    const {onDone, deadLine} = props;
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const timeIntervalRef = useRef<NodeJS.Timeout|null>(null)

    const _computeTimeRemaining = (): number => {
        const total = deadLine.getTime() - new Date().getTime();
        setSeconds(Math.floor((total / 1000) % 60));
        setMinutes(Math.floor((total / 1000 / 60) % 60));
        setHours(Math.floor((total / (1000 * 60 * 60)) % 24));
        setDays(Math.floor(total / (1000 * 60 * 60 * 24)));

        return total;
    }

    useMount(() => {
        const updateClock = () => {
            const total = _computeTimeRemaining();
            if (total <= 0) {
                if (timeIntervalRef.current) {
                    clearInterval(timeIntervalRef.current);
                }
                onDone();
            }
        }
        updateClock();
        timeIntervalRef.current = setInterval(updateClock, 1000);
    })

    useUnmount(() => {
        timeIntervalRef.current && clearInterval(timeIntervalRef.current);
    })

    return <div className={styles.layout}>
        <span><b>Days</b>: {days}</span>
        <span><b>Hours:</b> {('0' + hours).slice(-2)}</span>
        <span><b>Minutes: </b> {('0' + minutes).slice(-2)}</span>
        <span><b>Seconds: </b>{('0' + seconds).slice(-2)}</span>
    </div>
};