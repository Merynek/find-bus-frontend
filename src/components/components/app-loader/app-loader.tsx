"use client";

import React from "react";
import {useApp} from "@/src/app/contexts/AppContext";

export const AppLoader = () => {
    const {isLoading} = useApp();
    return isLoading ? (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <span
                className="text-5xl text-white font-bold [text-shadow:_2px_2px_4px_rgb(0_0_0_/_70%)] animate-pulse-more">
                Načítání...
            </span>
        </div>
    ) : null;
};