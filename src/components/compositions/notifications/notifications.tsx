import {Notification} from "@/src/data/notifications/notification";
import {NotificationsEnum} from "@/src/api/openapi";
import {NotificationSettingsData} from "@/src/data/notifications/notificationSettingsData";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";
import {NotificationConverter} from "@/src/converters/notifications/notification-converter";
import {NewTripSettingsData} from "@/src/data/notifications/newTripNotificationSettingsData";
import {FlexGap} from "@/src/enums/layout.enum";

interface INotifications {
    notifications: Notification[];
    onChange: (notifications: Notification[]) => void;
}

export const Notifications = (props: INotifications) => {
    const {notifications, onChange} = props;

    const getCurrentRadius = (): number => {
        const newTripNotif = notifications.find(n => n.type === NotificationsEnum.NEW_TRIP);
        return newTripNotif?.settingsJson?.newTrip?.radiusInMeters || 0;
    }

    const allNotifications = (): NotificationsEnum[] => {
        return Object.values(NotificationsEnum).map(key => {
            return key;
        })
    }

    const isActive = (type: NotificationsEnum): boolean => {
        return !!notifications.find(n => n.type === type);
    }

    const updateNewTripRadius = (newRadius: number|undefined) => {
        const radiusValue = newRadius || 0;

        const updatedNotifications = notifications.map(n => {
            if (n.type === NotificationsEnum.NEW_TRIP) {
                const updatedSettings = new NotificationSettingsData({
                    newTrip: new NewTripSettingsData({
                        radiusInMeters: radiusValue
                    })
                });

                return new Notification({
                    ...n,
                    settingsJson: updatedSettings
                });
            }
            return n;
        });

        onChange(updatedNotifications);
    }

    const toggleNotification = (type: NotificationsEnum, isChecked: boolean) => {
        if (isChecked) {
            const settings = new NotificationSettingsData({});
            switch (type) {
                case NotificationsEnum.NEW_TRIP:
                    settings.newTrip = new NewTripSettingsData({
                        radiusInMeters: getCurrentRadius()
                    })
                    break;
            }
            const newNotification: Notification = new Notification({
                isEmailEnabled: true,
                isSmsEnabled: false,
                isAppPushEnabled: false,
                type: type,
                settingsJson: settings
            });
            onChange([...notifications, newNotification]);
        } else {
            onChange(notifications.filter(n => n.type !== type));
        }
    };

    const renderCheckBox = (label: string, type: NotificationsEnum) => {
        return <CheckBox
            label={label}
            name={FormDataEnum.notifications}
            checked={notifications.some(n => n.type === type)}
            controlled={true}
            onChange={(isChecked) => toggleNotification(type, isChecked)}
        />
    }

    const renderNotification = (type: NotificationsEnum) => {
        switch (type) {
            case NotificationsEnum.NEW_OFFER_FROM_TRANSPORTER:
                return renderCheckBox("NEW OFFER", type);
            case NotificationsEnum.NEW_TRIP:
                return <LayoutFlexColumn style={{border: "2px solid black"}}>
                    {renderCheckBox("NEW TRIP", type)}
                    <NumberBox
                        controlled={true}
                        disabled={!isActive(type)}
                        value={getCurrentRadius()}
                        onChange={(val) => {
                            updateNewTripRadius(val);
                        }}
                    />
                </LayoutFlexColumn>
        }
    }

    return <>
        <input
            type="hidden"
            name={FormDataEnum.notifications}
            value={JSON.stringify(notifications.map(NotificationConverter.toJson))}
        />
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            {allNotifications().map(type => {
                return <React.Fragment key={type}>
                    {renderNotification(type)}
                </React.Fragment>
            })}
        </LayoutFlexColumn>
    </>
}