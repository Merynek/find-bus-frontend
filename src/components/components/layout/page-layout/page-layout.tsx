import React from "react";

interface IPageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout = (props: IPageLayoutProps) => {
    const {children} = props;
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {children}
    </div>
}