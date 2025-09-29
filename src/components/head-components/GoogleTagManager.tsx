import Script from "next/script";
import {useGa} from "@/src/hooks/gaEventHook";
import {GA_STORAGE} from "@/src/enums/ga.enums";

interface IGoogleTagManagerProps {
    gtmFunction: string;
}

export const GoogleTagManager = (props: IGoogleTagManagerProps) => {
    const {gtmFunction} = props;
    const {toggleStorageConsent} = useGa();
    return <>
        {gtmFunction && <Script
            id="tagManager"
            async={true}
            onReady={() => {
                toggleStorageConsent(GA_STORAGE.AD_STORAGE, true);
                toggleStorageConsent(GA_STORAGE.ANALYTICS_STORAGE, true);
            }}
        >
            {`${gtmFunction}`}
        </Script>}
    </>
}