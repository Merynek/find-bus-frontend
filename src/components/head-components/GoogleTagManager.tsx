import Script from "next/script";

interface IGoogleTagManagerProps {
    gtmFunction: string;
}

export const GoogleTagManager = (props: IGoogleTagManagerProps) => {
    const {gtmFunction} = props;
    return <>
        {gtmFunction && <Script
            id="tagManager"
            async={true}
        >
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://green.find-bus.com/bdlczojxfa.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','23n=CAJFLTs3TicpNSAnWEk5ShdbSkReXAcCXAARBAtXARkSSBsFAg%3D%3D');`}
        </Script>}
    </>
}