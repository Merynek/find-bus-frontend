import { useState } from "react";
import {Notification} from "@/src/data/notifications/notification";
import {NotificationsEnum} from "@/src/api/openapi";
import {NotificationSettingsData} from "@/src/data/notifications/notificationSettingsData";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import React from "react";
import {CheckBox} from "@/src/components/components/inputs/check-box/check-box";
import {NumberBox} from "@/src/components/components/inputs/number-box/number-box";

interface INotifications {
    notifications: Notification[];
}

export const Notifications = (props: INotifications) => {
    const {notifications} = props;
    const [enabledNotifications, setEnabledNotifications] = useState<Notification[]>(notifications);
    const [radius, setRadius] = useState<number|undefined>(0);

    const allNotifications = (): NotificationsEnum[] => {
        return Object.values(NotificationsEnum).map(key => {
            return key;
        })
    }

    const toggleNotification = (type: NotificationsEnum, isChecked: boolean) => {
        if (isChecked) {
            const settings = new NotificationSettingsData({});
            switch (type) {
                case NotificationsEnum.NEW_TRIP:
                    settings.newTrip = {
                        radiusInMeters: radius || 0
                    }
            }
            const newNotification: Notification = new Notification({
                isEmailEnabled: true,
                isSmsEnabled: false,
                isAppPushEnabled: false,
                type: type,
                settingsJson: settings
            });
            setEnabledNotifications(prev => [...prev, newNotification]);
        } else {
            setEnabledNotifications(prev => prev.filter(n => n.type !== type));
        }
    };

    const renderCheckBox = (label: string, type: NotificationsEnum) => {
        return <CheckBox
            label={label}
            name={FormDataEnum.notifications}
            checked={enabledNotifications.some(n => n.type === type)}
            controlled={true}
            onChange={(isChecked) => toggleNotification(type, isChecked)}
        />
    }

    const renderNotification = (type: NotificationsEnum) => {
        switch (type) {
            case NotificationsEnum.NEW_OFFER_FROM_TRANSPORTER:
                return renderCheckBox("NEW OFFER", type);
            case NotificationsEnum.NEW_TRIP:
                return <LayoutFlexColumn>
                    {renderCheckBox("NEW TRIP", type)}
                    <NumberBox
                        controlled={true}
                        value={radius}
                        onChange={(val) => {
                            setRadius(val);
                        }}
                    />
                </LayoutFlexColumn>
        }
    }

    return <>
        <input
            type="hidden"
            name={FormDataEnum.notifications}
            value={JSON.stringify(enabledNotifications)}
        />
        <LayoutFlexColumn>
            {allNotifications().map(type => {
                return <React.Fragment key={type}>
                    {renderNotification(type)}
                </React.Fragment>
            })}
        </LayoutFlexColumn>
    </>
}