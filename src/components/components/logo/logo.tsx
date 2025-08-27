import {ImageElement} from "@/src/components/components/image-element/image-element";

export const Logo = () => {
    return <ImageElement
        src={'/global/logo.svg'}
        alt={"company logo"}
        fill={false}
        width={170}
        height={40}
    />
}
