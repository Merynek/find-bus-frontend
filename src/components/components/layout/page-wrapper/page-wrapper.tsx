interface IPageWrapperProps {
    children: React.ReactNode;
}

export const PageWrapper = (props: IPageWrapperProps) => {
    return <div className="flex flex-col items-center py-20">
        <div className="p-8 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
            {props.children}
        </div>
    </div>
}