import {GoogleTagManager} from "@next/third-parties/google";
import React from "react";

export const TagManager = () => {
    const id = process.env.NEXT_PUBLIC_GTM_ID || "";
    const server = process.env.NEXT_PUBLIC_GTM_SERVER || "";

    return <>
        {id && server && <GoogleTagManager
            gtmId={id}
            gtmScriptUrl={server}
        />}
    </>
}