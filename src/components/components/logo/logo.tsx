import {ImageElement} from "@/src/components/components/image-element/image-element";

export const Logo = () => {
    return <div style={{width: "200px", height: "80px", position: "relative"}}>
        <ImageElement
            src={'./global/logo.svg'}
            alt={"logo"}
            fill={true}
        />
    </div>
}
