import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import AdminTripDetailPage from "@/src/components/pages/admin/trip-detail/admin-trip-detail.page";
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

const meta: Meta<typeof AdminTripDetailPage> = {
    component: AdminTripDetailPage,
    args: {},
    argTypes: {},
    decorators: [withRouter],
    parameters: {
        layout: 'fullscreen',
        reactRouter: reactRouterParameters({
            routing: {
                path: '/admin/trip/:id',
                handle: '42'
            },
            location: {
                pathParams: { id: '42' },
            },
        }),
    }
};

export default meta;

export const Default: StoryObj<typeof AdminTripDetailPage> = {
    render: (args) => <AdminTripDetailPage {...args} />
};