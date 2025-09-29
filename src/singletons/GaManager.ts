import {GA_STORAGE, GENERAL_GA_EVENTS} from "@/src/enums/ga.enums";
import {Currency} from "@/src/api/openapi";

export interface IGaTrackData {
    value?: number;
    ecommerce?: IEcommerceTrackData;
    user?: ILoggedUserData;
    _clear?: boolean;
}

export interface IEcommerceTrackData {
    transaction_id?: number;
    value?: number;
    currency?: Currency;
    items?: IGaTrackDataItem[];
}

interface IGaTrackDataItem {
    item_id?: string;
    item_name?: string;
    item_category?: string;
    price?: number;
    currency?: Currency;
    quantity?: number;
}

export interface ILoggedUserData {
    id: number;
    email: string;
}

export class GaManager {
    public static async sendEvent(event: GENERAL_GA_EVENTS, params: IGaTrackData): Promise<void> {
        await this._sendEvent(event, params);
    }

    private static async _sendEvent(event: GENERAL_GA_EVENTS, params: IGaTrackData|null): Promise<void> {
        return new Promise((resolve) => {
            const timeout = window.setTimeout(() => {
                resolve();
            }, 1000);
            try {
                const allParams = {
                    ...params,
                    "event_callback": () => {
                        window.clearTimeout(timeout);
                        resolve()
                    }
                }
                if (window.gtag) {
                    window.gtag(params);
                    window.gtag("event", event, allParams)
                } else {
                    resolve();
                }

            } catch (error) {
                console.error(error);
                window.clearTimeout(timeout);
                resolve()
            }
        })
    }

    public static toggleStorageConsent(storage: GA_STORAGE, enabled: boolean) {
        const params: {[key: string]: unknown} = {};
        params[storage] = enabled ? "granted" : "denied";
        if (window.gtag) {
            window.gtag("consent", "update", params);
        }
    }
}