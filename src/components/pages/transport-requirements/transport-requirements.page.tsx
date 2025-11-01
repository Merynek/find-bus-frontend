"use client";

import {useTranslate} from "@/src/hooks/translateHook";
import React, {useEffect, useState } from "react";
import {ButtonClick, ButtonSize, ButtonType} from "../../components/button/button";
import {
    TransporterRequirementsResponseDto, TransportRequirementStatus,
    TransportRequirementsType
} from "@/src/api/openapi";
import {LayoutFlexColumn} from "../../components/layout/layout-flex-column/layout-flex-column";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useInit} from "@/src/hooks/lifecycleHooks";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";
import {
    transportRequirementsFormAction
} from "@/src/server-actions/forms/transportRequierements/transportRequirementsFormAction";
import {
    createInitDocuments,
    IDocumentItem, uploadFiles
} from "@/src/components/pages/transport-requirements/transport-requirements-utils.page";
import {ROUTES} from "@/src/enums/router.enum";
import {UsersService} from "@/src/services/UsersService";
import {useRouter} from "@/src/i18n/navigation";
import FileGroupUploaderForm
    from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {Text} from "@/src/components/components/texts/text";
import {FormActionEnum} from "@/src/enums/form-action.enum";

interface ITransportRequirementsPageProps {
    transportRequirements: TransporterRequirementsResponseDto;
}

const TransportRequirementsPage = (props: ITransportRequirementsPageProps) => {
    const transportRequirements = useInit(() => TransportRequirementsConverter.toInstance(props.transportRequirements));
    const [documents, setDocuments] = useState<IDocumentItem[]>(createInitDocuments(transportRequirements));
    const [documentIdsToDelete, setDocumentIdsToDelete] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const {t} = useTranslate("page.transportRequirements");
    const [state, action, pending] = useFormActionState(transportRequirementsFormAction, {
        data: {
            concessionNumber: transportRequirements.concessionNumber
        }
    })

    useEffect(() => {
        if (state?.success && state?.apiResult) {
            onSuccess(state.apiResult.updatedRequirementsId, state.apiResult.sendRequirementsToVerification);
        }
    }, [state]);

    const onSuccess = async (requirementsId: number, sendRequirementsToVerification: boolean) => {
        setIsUploading(true);
        try {
            await uploadFiles(documents, documentIdsToDelete, requirementsId);
            if (sendRequirementsToVerification) {
                await UsersService.sendTransportRequirementsToVerification({
                    transportRequirementsId: requirementsId
                })
            }
            router.push(ROUTES.USER_SETTINGS);
        } catch (error) {
            console.error("Error during submit or upload:", error);
        } finally {
            setIsUploading(false);
        }
    }

    const renderDocumentUploader = (type: TransportRequirementsType, label: string) => {
        const _files = documents.filter(p => p.type === type);
        return <FileGroupUploaderForm
            files={_files}
            deleteIds={documentIdsToDelete}
            label={label}
            onChange={(items, deleteIds) => {
                const cleanItems = documents.filter(p => p.type !== type);
                const newItems = items.map(i => {
                    return {
                        ...i,
                        type: type
                    }
                })
                setDocuments([...cleanItems, ...newItems]);
                setDocumentIdsToDelete([...documentIdsToDelete, ...deleteIds]);
            }}
        />
    }

    const renderDocuments = () => {
        return <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
            <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                {renderDocumentUploader(TransportRequirementsType.BUSINESS_RISK, t("businessRisk"))}
                {renderDocumentUploader(TransportRequirementsType.CONCESSION, t("concession"))}
            </LayoutFlexColumn>
        </LayoutFlexColumn>
    }

    const renderWarningTextDependOnStatus = () => {
        switch (transportRequirements.status) {
            case TransportRequirementStatus.VERIFIED:
                return <div style={{color: "red"}}>{"Při uložení se vám zneplatní verifikace tohoto nastavení a budete ho muset znovu zalat k ověření."}</div>
            case TransportRequirementStatus.PENDING_VERIFICATION:
                return <div style={{color: "red"}}>{"Při uložení se zruší požadavek na verifikaci a budete muset nastavení znovu zaslat k ověření."}</div>
            case TransportRequirementStatus.NOT_VERIFIED:
                return <div style={{color: "red"}}>{"Upravte nastavení a pošlete znova na ověření."}</div>
            case TransportRequirementStatus.DRAFT:
            case TransportRequirementStatus.ARCHIVED:
                return null;
        }
    }

    const renderVerificationFeedback = () => {
        if (transportRequirements.verificationFeedback?.description) {
            return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
                <Text text={"Admin feedback"} fontSize={FontSize.M_24} fontWeight={FontWeight.SEMIBOLD} />
                <Text text={transportRequirements.verificationFeedback.description} fontSize={FontSize.BASE_14} />
            </LayoutFlexColumn>
        }
        return null;
    }

    const renderTransportRequirements = () => {
        return <>
            <Heading text={t("transportRequirementsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={4}/>
            <span>{"User => " + t("verifiedForTransporting") + "-" +  t("notVerifiedForTransporting")}</span>
            <TextBox
                controlled={false}
                name={FormDataEnum.concessionNumber}
                id={FormDataEnum.concessionNumber}
                type={TextBoxType.TEXT}
                placeholder={t("concessionNumber")}
                defaultValue={state?.data?.concessionNumber || ""}
            />
            {renderDocuments()}
        </>
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("transportRequirementsHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            <div style={{backgroundColor: "aquamarine"}}>
                {transportRequirements.status.toString()}
            </div>
            {renderWarningTextDependOnStatus()}
            {renderVerificationFeedback()}
        </LayoutFlexColumn>
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state}/>
                <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                    {renderTransportRequirements()}
                </LayoutFlexColumn>
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    name={FormDataEnum.formActionType}
                    value={FormActionEnum.SAVE}
                    isDisabled={pending || isUploading}
                    label={t("saveButton")}
                />
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    name={FormDataEnum.formActionType}
                    value={FormActionEnum.SAVE_AND_VERIFY}
                    isDisabled={pending || isUploading}
                    label={t("saveAndPostToVerification")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
};

export default TransportRequirementsPage;