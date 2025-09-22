import {ImageElement} from "@/src/components/components/image-element/image-element";

export const Logo = () => {
    return <div style={{position: "relative", width: "170px", height: "60px"}}>
        <ImageElement
            src={'/global/logo.svg'}
            alt={"company logo"}
            fill={true}
            priority={true}
        />
    </div>
}
