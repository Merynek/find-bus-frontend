import React, {ChangeEvent, useState} from "react";
import {ImageElement} from "@/src/components/components/image-element/image-element";

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

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

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
            />
        </div>
    );
};