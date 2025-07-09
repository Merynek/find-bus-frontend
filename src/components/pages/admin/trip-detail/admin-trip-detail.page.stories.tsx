import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";

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
    render: (args) => <AdminTripDetailPage />
};