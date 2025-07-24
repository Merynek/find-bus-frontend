import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import {LOCALES} from "@/src/utils/locale";

const nextConfig: NextConfig = {
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        createMessagesDeclaration: `./messages/${LOCALES.cs_CZ.toString()}.json`
    }
});
export default withNextIntl(nextConfig);