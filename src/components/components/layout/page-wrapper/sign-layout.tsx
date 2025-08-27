import React from "react";

interface IPageWrapperProps {
    children: React.ReactNode;
}

export const SignLayout = (props: IPageWrapperProps) => {
    return <div className="flex flex-col items-center">
        <div className="p-8 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
            {props.children}
        </div>
    </div>
}