export async function fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

export async function fileToBlob(file: File, size: number): Promise<string> {
    return fileToBlobThumbnail(file, size, size);
}

async function fileToBlobThumbnail(file: File, maxWidth: number = 400, maxHeight: number = 400): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(blob => {
                if (blob) {
                    resolve(URL.createObjectURL(blob));
                }
            });
        }
    })
}
