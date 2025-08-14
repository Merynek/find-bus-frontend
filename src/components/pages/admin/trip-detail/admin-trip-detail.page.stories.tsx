import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";
import {getRandomOffer, getRandomOfferMovement, getRandomTrip} from "@/dataGenerator/trip";
import {LOCALES} from "@/src/utils/locale";

const meta: Meta<typeof AdminTripDetailPage> = {
    component: AdminTripDetailPage,
    args: {},
    argTypes: {},
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            navigation: {
                segments: [
                    ['id', '456']
                ],
            },
        },
    }
};

export default meta;

export const Default: StoryObj<typeof AdminTripDetailPage> = {
    render: () => <AdminTripDetailPage
        trip={getRandomTrip()}
        offerMovements={[getRandomOfferMovement()]}
        offers={[getRandomOffer()]}
        locale={LOCALES.cs_CZ}
    />
};