"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface IAppProviderProps {
    children: ReactNode;
}

export const AppProvider = (props: IAppProviderProps)  => {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(false);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    return (
        <AppContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};