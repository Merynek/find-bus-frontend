"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React, {useState} from "react";
import {CreateTripPageStore} from "./create-trip.page.store";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {useInit, useMount, useUnmount} from "@/src/hooks/lifecycleHooks";
import {useApp} from "@/src/context/AppContext";
import { useRouter } from "@/src/i18n/navigation";
import {AppBusinessConfigResponseDto, TripResponseDto} from "@/src/api/openapi";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {Trip} from "@/src/data/trip/trip";
import {SignModal} from "@/src/components/compositions/sign/sign-modal/sign-modal";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {CreateTripForm} from "@/src/components/pages/create-trip/components/create-trip-form";

interface ICreateTripPageProps {
    cfg: AppBusinessConfigResponseDto;
    trip?: TripResponseDto;
}

const CreateTripPage = (props: ICreateTripPageProps) => {
    const config = AppBusinessConfigConverter.toInstance(props.cfg);
    const router = useRouter();
    const {showLoader, hideLoader} = useApp();
    const _store = useInit(() => new CreateTripPageStore(config, props.trip ? TripConverter.toInstance(props.trip) : Trip.create({})));
    const {t} = useTranslate("page.trip");
    const {user} = useLoggedUser();
    const [signDialogOpen, setSignDialogOpen] = useState(false);

    useMount(() => {
        _store.init();
    })

    useUnmount(() => {
        _store.destroy();
    })

    const renderSignModal = () => {
        return <SignModal
            open={signDialogOpen}
            afterRegistration={async (email) => {
                await _store.saveUnauthorizedTrip(email);
            }}
            afterLogin={async () => {
                await _store.saveTrip();
            }}
            onClose={() => {
                setSignDialogOpen(false);
            }}
        />
    }

    const renderPublishButton = () => {
        return <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={t("createDemand")}
            type={ButtonType.BLACK}
            onClick={async () => {
                let errors = "";
                _store.validate();
                if (!_store.isValid) {
                    if (!_store.placesAreSet) {
                        errors += " @ All places are required, "
                    }
                    if (!_store.peopleCountIsValid) {
                        errors += " @ Minimum count of people is 1, "
                    }
                    if (!_store.routesCountIsValid) {
                        errors += " @ Minimum count of routes is 1"
                    }
                    // if (!_store.userSettings?.isValidForCreateInvoice) { // todo
                    //     errors += " @ settings are not valid"
                    // }
                    alert(errors);
                } else {
                    try {
                        showLoader();
                        await _store.saveTrip();
                        await _store.publishTrip();
                        hideLoader();
                        router.push(ROUTES.TRIP_LIST);
                    }
                    catch (e) {
                        console.log("error during create trip", JSON.stringify(e));
                    }
                }
            }}
        />
    }

    const renderSaveButton = () => {
        return <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={t("saveButton")}
            type={ButtonType.YELLOW}
            onClick={async () => {
                try {
                    showLoader();
                    await _store.saveTrip();
                    router.replace({
                        pathname: ROUTES.DRAFT_TRIP,
                        params: {
                            [URL_PARAMS.TRIP_ID]: _store.trip.id.toString()
                        }
                    });
                    hideLoader();
                }
                catch (e) {
                    console.log("error during save trip", JSON.stringify(e));
                }
            }}
        />
    }

    const renderRegisterAndSaveButton = () => {
        return <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={"Registrovat se a uložit cestu"}
            type={ButtonType.YELLOW}
            onClick={() => {
                setSignDialogOpen(true);
            }}
        />
    }

    return <LayoutFlexColumn gap={FlexGap.MEDIUM_24} style={{padding: "20px"}}>
        {renderSignModal()}
        <CreateTripForm store={_store} config={config} />
        <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            {user == null && renderRegisterAndSaveButton()}
            {user && renderSaveButton()}
            {user && renderPublishButton()}
        </LayoutFlexColumn>
    </LayoutFlexColumn>
};

export default CreateTripPage;