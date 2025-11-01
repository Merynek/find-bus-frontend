import {ImageElement} from "@/src/components/components/image-element/image-element";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import {TransportRequirements} from "@/src/data/transportRequirements";

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
        <LayoutFlexRow canWrap={true} gap={FlexGap.SMALL_16}>
            {requirements.documents.map(document => {
                return <div key={document.id}>
                    <span>{document.type}:</span>
                    {document.image?.path && renderImage(document.image.path)}
                </div>
            })}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};