import {GA_STORAGE, GENERAL_GA_EVENTS} from "@/src/enums/ga.enums";
import {GaManager, IGaTrackData} from "@/src/singletons/GaManager";
import {useLoggedUser} from "@/src/hooks/authenticationHook";

interface IGaFunctions {
    sendEvent: (event: GENERAL_GA_EVENTS, params: IGaTrackData) => Promise<void>;
    toggleStorageConsent: (storage: GA_STORAGE, enabled: boolean) => void;
}

export const useGa = (): IGaFunctions => {
    const {user} = useLoggedUser();

    return {
        sendEvent: async (event: GENERAL_GA_EVENTS, params: IGaTrackData) => {
            GaManager.toggleStorageConsent(GA_STORAGE.ANALYTICS_STORAGE, true);
            GaManager.toggleStorageConsent(GA_STORAGE.AD_STORAGE, true);
            if (!params.user && user) {
                params.user = {
                    id: user.id,
                    email: user.email
                }
            }
            await GaManager.sendEvent(event, params);
        },
        toggleStorageConsent: (storage: GA_STORAGE, enabled: boolean) => {
            GaManager.toggleStorageConsent(storage, enabled);
        }
    }
}