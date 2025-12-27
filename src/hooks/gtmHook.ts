import {GENERAL_GA_EVENTS} from "@/src/enums/ga.enums";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {sendGTMEvent} from "@next/third-parties/google";
import {Currency} from "@/src/api/openapi";

export interface IGaTrackData {
    value?: number;
    ecommerce?: IEcommerceTrackData;
    user?: ILoggedUserData;
    _clear?: boolean;
    trip_id?: number;
    trip_distance_km?: number;
    source?: string;
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

interface IGtmFunctions {
    sendEvent: (event: GENERAL_GA_EVENTS, params: IGaTrackData) => void;
}

export const useGtm = (): IGtmFunctions => {
    const {user} = useLoggedUser();

    return {
        sendEvent: (event: GENERAL_GA_EVENTS, params: IGaTrackData) => {
            if (!params.user && user) {
                params.user = {
                    id: user.id,
                    email: user.email
                }
            }
            sendGTMEvent({event: event, value: params});
        }
    }
}