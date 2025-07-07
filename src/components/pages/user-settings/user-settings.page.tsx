import {useTranslate} from "@/src/hooks/translateHook";
import React, {useRef} from "react";
import styles from "./user-settings.page.module.scss";
import {observer} from "mobx-react";
import {UserSettingsPageStore} from "./user-settings.page.store";
import {TextBox, TextBoxType} from "../../components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {Form} from "../../components/form/form";
import {Country, NotificationsEnum, UserRole} from "@/src/api/openapi";
import {CheckBox} from "../../components/inputs/check-box/check-box";
import {LayoutFlexColumn} from "../../components/layout/layout-flex-column/layout-flex-column";
import {UserAddress} from "@/src/data/users/userAddress";
import {ComboBox} from "../../components/inputs/combo-box/combo-box";
import {TransferInfo} from "@/src/data/transferInfo";
import {CurrentUser} from "@/src/singletons/current-user";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {MediaElement} from "../../components/media-element/media-element";
import {FileUploadInput} from "../../components/file-upload-input/file-upload-input";
import {getPhotosFromFiles} from "@/src/utils/file/file";
import {Photo} from "@/src/data/media/photo";
import {Icon} from "../../components/icon/icon";
import {IconType} from "@/src/enums/icon.enum";
import {useBean} from "ironbean-react";
import {DropFileType} from "@/src/enums/file-drop-type.enum";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import {AppManager} from "@/src/singletons/app-manager";
import {useMount} from "@/src/hooks/lifecycleHooks";

export interface IUserSettingsPageProps {
}

enum PhotoType {
    ConcessionDocuments = "ConcessionDocuments",
    BusinessRiskInsurance = "BusinessRiskInsurance"
}

const UserSettingsPage = observer((props: IUserSettingsPageProps) => {
    const _locKey = "page.userSettings."
    const _currentUser = useBean(CurrentUser);
    const _storeRef = useRef<UserSettingsPageStore>(new UserSettingsPageStore());
    const _appManager = useBean(AppManager);
    const store = _storeRef.current;
    const settings = store.userSettings;
    const {t}= useTranslate();

    useMount(() => {
        _storeRef.current.loadData();
    })

    const _countryItems = Object.values(Country).map(key => {
        return {
            label: key,
            value: key
        }
    });

    const submit = async () => {
        _appManager.loading = true;
        await store.save();
        _appManager.loading = false;
    }

    const allNotifications = (): NotificationsEnum[] => {
        return Object.values(NotificationsEnum).map(key => {
            return key;
        })
    }

    const _renderTransferInfoForm = (transfer: TransferInfo) => {
        return <LayoutFlexColumn>
            <TextBox
                value={transfer.iban}
                onChange={(val) => transfer.iban = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "iban")}
            />
            <TextBox
                value={transfer.swift}
                onChange={(val) => transfer.swift = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "¨swift")}
            />
        </LayoutFlexColumn>
    }

    const _renderTransportRequirementsForm = (requirements: TransportRequirements) => {
        return <LayoutFlexColumn>
            <LayoutFlexColumn>
                <span>{"User => " + (store.userSettings?.isVerifiedForTransporting ? "Verified" : "Not Verified")}</span>
            </LayoutFlexColumn>
            <TextBox
                value={requirements.concessionNumber}
                onChange={(val) => requirements.concessionNumber = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "concessionNumber")}
            />
            {_renderPhoto(PhotoType.BusinessRiskInsurance)}
            {_renderPhoto(PhotoType.ConcessionDocuments)}
        </LayoutFlexColumn>
    }

    const _handleAddMedia = async (files: File[], type: PhotoType) => {
        const photos = await getPhotosFromFiles(files);

        if (store.userSettings) {
            switch (type) {
                case PhotoType.ConcessionDocuments:
                    store.userSettings.transportRequirements.concessionDocuments = photos[0];
                    break;
                case PhotoType.BusinessRiskInsurance:
                    store.userSettings.transportRequirements.businessRiskInsurance = photos[0];
                    break;
            }
        }
    }

    const _renderPhoto = (type: PhotoType) => {
        const data = _renderPhotoData(type);
        return <div className={styles.line}>
            <span>{data.label} :</span>
            {data.photo && <div className={styles.photo}>
                <MediaElement
                    key={data.photo.id}
                    mediaItem={data.photo}
                />
            </div>}
            <FileUploadInput
                type={[DropFileType.IMAGE]}
                onDrop={async (files) => {
                    await _handleAddMedia(files, type);
                }}
                opener={<div>
                    <Icon
                        icon={IconType.ADD}
                    />
                    <span>SELECT FILE</span>
                </div>}
            />
        </div>
    }

    const _renderPhotoData = (type: PhotoType): {label: string, photo: Photo|null} => {
        switch (type) {
            case PhotoType.ConcessionDocuments:
                return {
                    label: "ConcessionDocuments",
                    photo: store.userSettings ? store.userSettings.transportRequirements.concessionDocuments : null
                }
            case PhotoType.BusinessRiskInsurance:
                return {
                    label: "BusinessRiskInsurance",
                    photo: store.userSettings ? store.userSettings.transportRequirements.businessRiskInsurance : null
                }
        }
    }

    const _renderAddressForms = (address: UserAddress) => {

        return <LayoutFlexColumn>
            <ComboBox
                items={_countryItems}
                value={address.country ? {
                    value: address.country,
                    label: address.country
                } : undefined}
                onChange={(item) => {
                    address.country = item.value as Country;
                }}
            />
            <TextBox
                value={address.city}
                onChange={(val) => address.city = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "city")}
            />
            <TextBox
                value={address.psc}
                onChange={(val) => address.psc = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "psc")}
            />
            <TextBox
                value={address.street}
                onChange={(val) => address.street = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "street")}
            />
            <TextBox
                value={address.houseNumber}
                onChange={(val) => address.houseNumber = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "houseNumber")}
            />
        </LayoutFlexColumn>
    }

    return settings ? <div className={styles.layout}>
        <Form onSubmit={submit}>
            <TextBox
                value={settings.name}
                onChange={(val) => settings.name = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "name")}
            />
            <TextBox
                value={settings.surname}
                onChange={(val) => settings.surname = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "surname")}
            />
            <TextBox
                value={settings.phoneNumber}
                onChange={(val) => settings.phoneNumber = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "phoneNumber")}
            />
            <TextBox
                value={settings.ico}
                onChange={(val) => settings.ico = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "ico")}
            />
            <TextBox
                value={settings.dic}
                onChange={(val) => settings.dic = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "dic")}
            />
            <TextBox
                value={settings.companyName}
                onChange={(val) => settings.companyName = val}
                type={TextBoxType.TEXT}
                placeholder={t(_locKey + "companyName")}
            />
            <h2>Jsi firma?:</h2>
            <CheckBox
                value={settings.isCompany}
                onChange={(val) => {
                    settings.isCompany = val;
                }}
                size={CheckBoxSize.SMALL}
            />
            <h2>Addresa:</h2>
            {_renderAddressForms(settings.address)}
            <h2>Korespondenční addresa (pokud je jiná):</h2>
            {_renderAddressForms(settings.mailingAddress)}
            <h2>Notifications</h2>
            {allNotifications().map((notification, index) => {
                return <div key={index}>
                    <span>{notification.toString()}</span>
                    <CheckBox
                        value={settings?.notifications.includes(notification)}
                        onChange={(val) => {
                            if (val) {
                                settings?.notifications.push(notification);
                            } else {
                                if (settings) {
                                    settings.notifications = settings.notifications.filter(n => n !== notification)
                                }
                            }
                        }}
                        size={CheckBoxSize.MEDIUM} />
                </div>
            })}
            {_currentUser.role === UserRole.TRANSPORTER && <>
                <h2>Bankovní udaje</h2>
                {_renderTransferInfoForm(settings.transferInfo)}
            </>}
            {_currentUser.role === UserRole.TRANSPORTER && <>
                <h2>Požadavky na transportera</h2>
                {_renderTransportRequirementsForm(settings.transportRequirements)}
            </>}
            <ButtonClick
                size={ButtonSize.BUTTON_SIZE_M}
                onClick={() => {}}
                type={ButtonType.BLACK}
                label={t(_locKey + "save")}
            />
        </Form>
    </div> : <div>LOADER</div>

});

export default UserSettingsPage;