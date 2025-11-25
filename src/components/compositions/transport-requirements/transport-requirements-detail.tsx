import {ImageElement} from "@/src/components/components/image-element/image-element";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {TransportRequirementsType} from "@/src/api/openapi";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";

export interface ITransportRequirementsDetailProps {
    requirements: TransportRequirements;
}

export const TransportRequirementsDetail = (props: ITransportRequirementsDetailProps) => {
    const {requirements} = props;

    const renderImage = (path: string) => {
        return <div style={{width: "200px", height: "200px", position: "relative"}}>
            <ImageElement
                src={path}
                alt={""}
                fill={true}
            />
        </div>
    }

    const renderDocumentsByType = (type: TransportRequirementsType) => {
        const documents = requirements.documents.filter(d => d.type === type);

        return <LayoutFlexColumn>
            <Text text={type} fontSize={FontSize.M_22} />
            <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
                {documents.map(document => {
                    return <div key={document.id}>
                        {document.image?.path && renderImage(document.image.path)}
                    </div>
                })}
            </LayoutFlexRow>
        </LayoutFlexColumn>
    }

    return <LayoutFlexColumn>
        <LayoutFlexColumn>
            <div style={{backgroundColor: "aquamarine"}}>
                {requirements.status.toString()}
            </div>
            <div>
                <span>ConcessionNumber: </span>
                <span>{requirements.concessionNumber}</span>
            </div>
        </LayoutFlexColumn>
        <LayoutFlexColumn>
            {renderDocumentsByType(TransportRequirementsType.CONCESSION)}
            {renderDocumentsByType(TransportRequirementsType.BUSINESS_RISK)}
        </LayoutFlexColumn>
    </LayoutFlexColumn>
};