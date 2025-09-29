import Script from "next/script";

interface IGoogleTagManagerProps {
    gtmFunction: string;
}

export const GoogleTagManager = (props: IGoogleTagManagerProps) => {
    const {gtmFunction} = props;
    return <>
        {gtmFunction && <Script id="tagManager" async={true}>
            {`${gtmFunction}`}
        </Script>}
    </>
}