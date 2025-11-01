import {
    TransportRequirementsType
} from "@/src/api/openapi";
import {generateId} from "@/src/utils/common";
import {
    IFileGroupUploaderItem
} from "@/src/components/compositions/files/file-group-uploader-form/file-group-uploader-form";
import {
    IDocumentUploadItem,
    TransportRequirementsFileUploaderService
} from "@/src/singletons/TransportRequirementsFileUploaderService";
import uniq from "lodash/uniq";
import {TransportRequirements} from "@/src/data/transportRequirements";


export interface IDocumentItem extends IFileGroupUploaderItem {
    type: TransportRequirementsType;
}

const createEmptyDocumentItem = (type: TransportRequirementsType): IDocumentItem => {
    return {
        id: generateId(),
        dbId: undefined,
        path: undefined,
        file: undefined,
        type: type
    };
}

export const createInitDocuments = (requirements: TransportRequirements): IDocumentItem[] => {
    const _items: IDocumentItem[] = [];
    requirements.documents.forEach(d => {
        if (d.image) {
            _items.push({
                id: d.id.toString(),
                dbId: d.id,
                path: d.image.path,
                file: d.image.file,
                type: d.type
            })
        }
    });
    _items.push(createEmptyDocumentItem(TransportRequirementsType.CONCESSION));
    _items.push(createEmptyDocumentItem(TransportRequirementsType.BUSINESS_RISK));
    return _items;
}

export const uploadFiles = async (documents: IDocumentItem[], documentIdsToDelete: number[], requirementsId: number) => {
    const _documents: IDocumentUploadItem[] = [];
    documents.forEach(d => {
        if (d.file && d.dbId === undefined) {
            _documents.push({
                clientFileId: d.id,
                file: d.file,
                type: d.type
            })
        }
    });
    await TransportRequirementsFileUploaderService.uploadDocumentFiles(requirementsId, _documents, uniq(documentIdsToDelete));
}