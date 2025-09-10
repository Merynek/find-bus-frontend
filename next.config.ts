import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import {LOCALES} from "@/src/utils/locale";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'findbusteststorage.blob.core.windows.net',
            },
            {
                protocol: 'https',
                hostname: 'findbusprodstorage.blob.core.windows.net',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "40mb"
        }
    }
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        createMessagesDeclaration: `./messages/${LOCALES.cs_CZ.toString()}.json`
    }
});
export default withNextIntl(nextConfig);