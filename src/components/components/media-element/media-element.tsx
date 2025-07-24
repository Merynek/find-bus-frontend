import React from "react";
import {Photo} from "@/src/data/media/photo";
import styles from "./media-element.module.scss";
import {MediaItem} from "@/src/data/media/mediaItem";
import {cn} from "@/src/utils/common";

interface IMediaElementProps {
    mediaItem: MediaItem;
    width?: number;
    height?: number;
    alt?: string;
}

export const MediaElement = (props: IMediaElementProps) => {
    const {mediaItem, width, height, alt} = props;

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
};