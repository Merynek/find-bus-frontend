import React from "react";
import {Image} from "@/src/data/media/Image";
import styles from "./image-element.module.scss";
import {cn} from "@/src/utils/common";
import NextImage from "next/image";

interface IMediaElementProps {
    image: Image;
    width?: number;
    height?: number;
    alt?: string;
}

export const ImageElement = (props: IMediaElementProps) => {
    const {image, width, height, alt} = props;

     return <NextImage
        className={cn(styles.image)}
        style={{width: width, height: height}}
        src={image.path}
        alt={alt || image.id.toString()}
    />
};