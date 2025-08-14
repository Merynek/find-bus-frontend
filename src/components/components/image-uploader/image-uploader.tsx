import {ChangeEvent, useState} from "react";

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
                <div className="mt-2">
                    <img src={preview} alt="Náhled" className="h-32 w-32 object-cover rounded-md" />
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