'use client'

import React from "react";
import {useTranslate} from "@/src/hooks/translateHook";

interface IReviewPageProps {
    token: string;
}

export const ReviewPage = (props: IReviewPageProps) => {
    const {token} = props;
    const {t} = useTranslate("page.review");


    return <div>{token}</div>
};