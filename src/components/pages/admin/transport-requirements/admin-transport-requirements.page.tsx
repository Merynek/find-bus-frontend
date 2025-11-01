"use client";

import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {
    TransporterRequirementsResponseDto,
    TransportRequirementStatus
} from "@/src/api/openapi";
import {useTranslate} from "@/src/hooks/translateHook";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {FlexGap} from "@/src/enums/layout.enum";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";
import AdminTransportRequirementsVerification
    from "@/src/components/pages/admin/transport-requirements/admin-transport-requirements-verification";
import {
    TransportRequirementsDetail
} from "@/src/components/compositions/transport-requirements/transport-requirements-detail";

interface IAdminTransportRequirementsPageProps {
    requirements: TransporterRequirementsResponseDto;
}

const AdminTransportRequirementsPage = (props: IAdminTransportRequirementsPageProps) => {
    const requirements = TransportRequirementsConverter.toInstance(props.requirements);
    const { t } = useTranslate("page.adminTransportRequirements");
    const showVerification = requirements.status === TransportRequirementStatus.PENDING_VERIFICATION;

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("transportRequirementsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <TransportRequirementsDetail requirements={requirements} />
        {showVerification && <>
            <AdminTransportRequirementsVerification transportRequirements={requirements} />
        </>}
    </LayoutFlexColumn>
};

export default AdminTransportRequirementsPage;
