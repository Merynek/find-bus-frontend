import {useCallback, useRef} from "react";
import {useResizeDetector} from "react-resize-detector";
import * as React from "react";

interface IDetectableOverflowProps {
    onChange?: (isOverflowed: boolean) => void;
    style?: object;
    children: React.ReactNode;
}

const defaultStyle: object = {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
};

export const DetectableOverflow = (props: IDetectableOverflowProps) => {
    const {onChange, children} = props;
    const isOverFlowedRef = useRef<boolean>(false);
    const style = props.style ? props.style : defaultStyle;

    const updateState = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        const newState =
            ref.current.offsetWidth < ref.current.scrollWidth ||
            ref.current.offsetHeight < ref.current.scrollHeight;

        if (newState === isOverFlowedRef.current) {
            return;
        }
        isOverFlowedRef.current = newState;
        if (onChange) {
            onChange(newState);
        }
    }, [])

    const { ref } = useResizeDetector({
        handleWidth: true,
        onResize: updateState
    });

    return <div
        style={style}
        ref={ref}
    >
        {children}
    </div>
}