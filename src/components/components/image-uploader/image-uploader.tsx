import React, {ChangeEvent} from "react";
import styles from "./image-uploader.module.scss";
import {ImageElement} from "@/src/components/components/image-element/image-element";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";

interface ImageUploaderProps {
    inputName: string;
    previewUrl?: string;
    onFileSelect: (file: File) => void;
    onDelete: () => void;
    isExistingPhoto: boolean;
    imageId: string;
}

export const ImageUploader = (props: ImageUploaderProps) => {
    const { inputName, previewUrl, isExistingPhoto, onDelete, onFileSelect, imageId } = props;
    const uniqueInputId = `${inputName}-${imageId}`;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    const handleDelete = () => {
        onDelete();
        if (!isExistingPhoto) {
            const fileInput = document.getElementById(uniqueInputId) as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
        }
    }

    const hasImage = !!previewUrl;

    return <LayoutFlexColumn>
        <label htmlFor={uniqueInputId} className="block text-sm font-medium text-gray-700">
            <LayoutFlexColumn>
                <Text text={"-> Vyberte fotku <-"} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD}/>
            </LayoutFlexColumn>
        </label>
        {hasImage && (
            <LayoutFlexRow>
                <div style={{width: "200px", height: "200px", position: "relative"}}>
                    <ImageElement
                        src={previewUrl}
                        alt={"preview"}
                        fill={true}
                    />
                </div>
                <ButtonClick
                    controlled={true}
                    onClick={handleDelete}
                    type={ButtonType.YELLOW}
                    size={ButtonSize.BUTTON_SIZE_M}
                    label={"Smazat"}
                />
            </LayoutFlexRow>
        )}
        <input
            id={uniqueInputId}
            name={inputName}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            multiple={false}
        />
    </LayoutFlexColumn>
};