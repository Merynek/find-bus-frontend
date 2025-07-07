import React, {ReactNode, Suspense} from "react";

interface IPageLoaderProps {
    children: ReactNode;
}

export const PageLoader = (props: IPageLoaderProps) => {
    const {children} = props;
    return (
        <Suspense fallback={"Načítám stránku"}>
            {children}
        </Suspense>
    );
}