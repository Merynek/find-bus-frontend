import React from "react";
import {Photo} from "@/src/data/media/photo";
import {observer} from "mobx-react";
import styles from "./media-element.module.scss";
import {MediaItem} from "@/src/data/media/mediaItem";
import {cn} from "@/src/utils/common";
import {useMount} from "@/src/hooks/lifecycleHooks";

interface IMediaElementProps {
    mediaItem: MediaItem;
    width?: number;
    height?: number;
    alt?: string;
}

export const MediaElement = observer((props: IMediaElementProps) => {
    const {mediaItem, width, height, alt} = props;

    useMount(() => {
        if (mediaItem.isPhoto() && !mediaItem.photoLoaded) {
            mediaItem.loadItem();
        }
    })

    const renderPhoto = (photo: Photo) => {
        return <img
            className={cn(styles.image)}
            style={{width: width, height: height}}
            src={photo.displayPath}
            alt={alt || photo.id.toString()}
        />
    }

    if (mediaItem.isPhoto()) {
        return renderPhoto(mediaItem);
    }
    return <div>TODO</div>
});