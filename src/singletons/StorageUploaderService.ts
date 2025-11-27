import {UploadSasUrl} from "@/src/data/uploadSasUrl";

export interface IStorageUploadItem {
    clientFileId: string;
    file: File;
}

export class StorageUploaderService {
    public static async UploadFiles(uploadSasUrls: UploadSasUrl[], files: IStorageUploadItem[]): Promise<UploadSasUrl[]> {
        const uploadPromises: Promise<UploadSasUrl|null>[] = [];
        uploadSasUrls.forEach(us => {
            const _photo = files.find(pp => pp.clientFileId === us.clientFileId);
            if (!_photo) return;

            const uploadPromise = this.uploadFile(us.uploadUrl, _photo.file)
                .then(() => {
                    return us;
                })
                .catch((error) => {
                    console.error(`Error during uploading photo ${us.clientFileId}:`, error);
                    return null;
                });

            uploadPromises.push(uploadPromise);
        });

        const uploadResults = await Promise.all(uploadPromises);
        return uploadResults.filter((r): r is UploadSasUrl => r !== null);
    }

    public static async uploadFile(uploadUrl: string, file: File) {
        const headers = new Headers();
        headers.append('x-ms-blob-type', 'BlockBlob');
        headers.append('Content-Type', file.type);

        const response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: headers,
            body: file,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Upload to Azure failed with HTTP ${response.status}: ${errorBody}`);
        }
    }
}