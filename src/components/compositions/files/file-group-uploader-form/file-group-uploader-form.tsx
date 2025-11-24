import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ImageUploader} from "@/src/components/components/image-uploader/image-uploader";
import React from "react";
import {generateId} from "@/src/utils/common";

interface IFileGroupUploaderFormProps {
    files: IFileGroupUploaderItem[];
    deleteIds: number[];
    label: string;
    onlyOneFile?: boolean;
    onChange: (items: IFileGroupUploaderItem[], deleteIds: number[]) => void;
}

export interface IFileGroupUploaderItem {
    id: string;
    dbId?: number;
    path?: string;
    file?: File;
}

const FileGroupUploaderForm = (props: IFileGroupUploaderFormProps) => {
    const { files, label, onlyOneFile, onChange, deleteIds } = props;

    const onAddItemOnIndex = (currentItems: IFileGroupUploaderItem[], index: number, file: File, idsToDelete: number[]) => {
        currentItems.splice(index, 0, {
            file: file,
            dbId: undefined,
            path: URL.createObjectURL(file),
            id: generateId()
        });
        onChange(currentItems, idsToDelete);
    }

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Text text={label} fontWeight={FontWeight.SEMIBOLD} fontSize={FontSize.M_22} />
        <LayoutFlexRow gap={FlexGap.MEDIUM_24} canWrap={true}>
            {files.map((item, index) => {
                return <React.Fragment key={index}>
                    <ImageUploader
                        inputName={""}
                        previewUrl={item.path || undefined}
                        onDelete={() => {
                            if (item.dbId) {
                                onChange(files.filter(i => i.dbId !== item.dbId), [...deleteIds, item.dbId]);
                            } else {
                                onChange(files.filter(i => i.file !== item.file), deleteIds);
                            }
                        }}
                        isExistingPhoto={item.dbId !== undefined}
                        onFileSelect={(file) => {
                            if (item.dbId) {
                                const newItems = files.filter(i => i.dbId !== item.dbId);
                                onAddItemOnIndex(newItems, index, file, [...deleteIds, item.dbId]);
                            } else if (item.file) {
                                const newItems = files.filter(i => i.file !== item.file);
                                onAddItemOnIndex(newItems, index, file, [...deleteIds]);
                            } else {
                                let newItems: IFileGroupUploaderItem[] = [];
                                if (!onlyOneFile) {
                                    newItems = [...files];
                                }
                                onAddItemOnIndex(newItems, index, file, [...deleteIds]);
                            }
                        }}
                    />
                </React.Fragment>
            })}
        </LayoutFlexRow>
    </LayoutFlexColumn>
};

export default FileGroupUploaderForm;
