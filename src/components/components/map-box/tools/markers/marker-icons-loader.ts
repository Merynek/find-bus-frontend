import {Map} from "mapbox-gl";
import {MarkerImages} from "@/src/enums/map-box.enum";

export const loadMarkersIcons = async (map: Map): Promise<void> => {
    for (const type in MarkerImages) {
        await addMarkerIcon(map, type as MarkerImages);
    }
}

const addMarkerIcon = async (map: Map, image: MarkerImages): Promise<void> => {
    let imageSrc = "";
    switch (image) {
        case MarkerImages.PLACE:
            imageSrc = "/map/place.png";
            break;
    }
    await loadAndAddImage(map, image, imageSrc)
}

const loadAndAddImage = async (map: Map, image: MarkerImages, imageSrc: string) => {
    if (!map.hasImage(image)) {
        const markerIcon = await loadImage(map, imageSrc);
        map.addImage(image, markerIcon, {});
    }
}

const loadImage = (map: Map, imageSrc: string): Promise<HTMLImageElement|ImageBitmap|ImageData>  => {
    return new Promise<HTMLImageElement|ImageBitmap|ImageData> ((resolve, reject) => {
        map.loadImage(imageSrc, (error, image) => {
            if (error || !image) {
                reject();
            } else {
                resolve(image);
            }
        })
    })
}