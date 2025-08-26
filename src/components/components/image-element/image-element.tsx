import React, {CSSProperties} from "react";
import NextImage from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type BaseImageProps = {
    alt: string;
    priority?: boolean;
    styles?: CSSProperties;
}

type RemoteImageProps = {
    src: string;
} & (
    | { fill: true; width?: never; height?: never }
    | { fill?: false; width: number; height: number }
    );

type StaticImageProps = {
    src: StaticImport;
    width?: number;
    height?: number;
    fill?: boolean;
};

type IImageProps = BaseImageProps & (RemoteImageProps | StaticImageProps);

export const ImageElement = (props: IImageProps) => {
    const {src, alt, priority, width, height, fill, styles} = props;

    return <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        style={fill ? { objectFit: "cover", ...styles } : styles}
    />;
};