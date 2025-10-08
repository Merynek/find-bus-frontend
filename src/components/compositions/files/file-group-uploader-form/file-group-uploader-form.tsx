import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import { useState } from "react";
import React from "react";
import {Image} from "@/src/data/media/Image";

interface IInputItems {
    id: number;
    file: Image;
}

interface IFileGroupUploaderFormProps {
    files: IInputItems[];
    label: string;
    idValue: string;
    formFileUpload: FormDataEnum;
    formFileType: FormDataEnum;
    formIdsToDelete?: FormDataEnum;
    onlyOneFile?: boolean;
}

interface IFileItem {
    id: string;
    dbId?: number;
    path?: string;
    file?: File;
}

const FileGroupUploaderForm = (props: IFileGroupUploaderFormProps) => {
    const { files, label, idValue, formFileUpload, formFileType, formIdsToDelete, onlyOneFile } = props;
    const [deletedFileIds, setDeletedFileIds] = useState<number[]>([]);

    const generateId = () => {
        return new Date().getTime().toString() + Math.random().toString();
    }

    const [items, setItems] = useState<IFileItem[]>(() => {
        const _items: IFileItem[] = files
            .map(p => ({
                id: p.id.toString(),
                dbId: p.id,
                path: p.file?.path,
                file: undefined,
            }));
        _items.push({
            id: generateId(),
            dbId: undefined,
            path: undefined,
            file: undefined
        });
        return _items;
    });

    const addItemOnIndex = (currentItems: IFileItem[], index: number, file: File) => {
        currentItems.splice(index, 0, {
            file: file,
            dbId: undefined,
            path: URL.createObjectURL(file),
            id: generateId()
        });
        setItems(currentItems);
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {items.map((item, index) => {
                const itemForUpload = item.dbId === undefined && item.path !== undefined;

                return <React.Fragment key={index}>
                    <ImageUploader
                        inputName={formFileUpload}
                        previewUrl={item.path || undefined}
                        onDelete={() => {
                            if (item.dbId) {
                                setDeletedFileIds([...deletedFileIds, item.dbId]);
                                setItems(prevItems => prevItems.filter(i => i.dbId !== item.dbId));
                            } else {
                                setItems(prevItems => prevItems.filter(i => i.file !== item.file));
                            }
                        }}
                        isExistingPhoto={item.dbId !== undefined}
                        onFileSelect={(file) => {
                            if (item.dbId) {
                                setDeletedFileIds([...deletedFileIds, item.dbId]);
                                const newItems = items.filter(i => i.dbId !== item.dbId);
                                addItemOnIndex(newItems, index, file);
                            } else {
                                let newItems: IFileItem[] = [];
                                if (!onlyOneFile) {
                                    newItems = [...items];
                                }
                                addItemOnIndex(newItems, index, file);
                            }
                        }}
                        imageId={item.id}
                    />
                    {itemForUpload && <input
                        type="hidden"
                        name={formFileType}
                        value={idValue}
                    />}
                </React.Fragment>
            })}
            {formIdsToDelete && deletedFileIds.map(id => (
                <input
                    key={id}
                    type="hidden"
                    name={formIdsToDelete}
                    value={id}
                />
            ))}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};

export default FileGroupUploaderForm;
