import React, {useCallback, useRef} from "react";
import {FileDrop} from "react-file-drop";
import {observer} from "mobx-react";
import {DropFileType} from "@/src/enums/file-drop-type.enum";

export interface IFileUploadInputProps {
    type: DropFileType[];
    onDrop: (files: File[]) => void;
    simple?: boolean;
    opener?: React.ReactNode;
}

export const FileUploadInput = observer((props: IFileUploadInputProps) => {
    const {simple, opener, type, onDrop} = props;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onTargetClick = useCallback(() => {
        fileInputRef.current && fileInputRef.current.click();
    }, []);

    const extensionIsSupported = (extension: string) => {
        for (const t of type) {
            if (extension.match(t)) {
                return true;
            }
        }
        return false;
    }

    const isSupported = (extensions: string[]): boolean => {
        return extensions.some(extension => extensionIsSupported(extension));
    }

    const onChange = async (fileList: FileList | null) => {
        const files = [];
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                if (fileList[i].size && isSupported([fileList[i].type])) {
                    files.push(fileList[i]);
                }
            }
        }
        if (files.length) {
            onDrop(files);
        }
    }

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.files);
        if (e.target) {
            e.target.value = "";
        }
        return false;
    }

    return <FileDrop
        onTargetClick={onTargetClick}
    >
        <input
            onChange={(e) => onFileInputChange(e)}
            type={"file"}
            ref={opener ? fileInputRef : undefined}
            style={opener ? {display: "none"} : {display: "block"}}
            multiple={!simple}
        />
        {opener && opener}
    </FileDrop>
});