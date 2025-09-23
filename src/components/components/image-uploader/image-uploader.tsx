import React, {ChangeEvent, useState} from "react";
import styles from "./image-uploader.module.scss";
import {ImageElement} from "@/src/components/components/image-element/image-element";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";

interface ImageUploaderProps {
    label: string;
    inputName: string;
    initialImage?: string;
}

export const ImageUploader = (props: ImageUploaderProps) => {
    const { label, inputName, initialImage } = props;
    const [preview, setPreview] = useState<string | null>(initialImage || null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(initialImage || null);
        }
    };

    return <LayoutFlexColumn>
        <label htmlFor={inputName} className="block text-sm font-medium text-gray-700">
            <LayoutFlexColumn>
                {label}
                <Text text={"-> Vyberte fotku <-"} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD} />
            </LayoutFlexColumn>
        </label>
        {preview && (
            <div style={{width: "200px", height: "200px", position: "relative"}}>
                <ImageElement
                    src={preview}
                    alt={"preview"}
                    fill={true}
                />
            </div>
        )}
        <input
            id={inputName}
            name={inputName}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
        />
    </LayoutFlexColumn>
};