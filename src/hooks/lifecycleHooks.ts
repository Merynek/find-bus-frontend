import {useEffect, useState} from "react";

/* call once after rendered to the DOM */
export const useMount = (effect: () => void) => {
    useEffect(effect, [effect]);
};

/* call after unmount from the DOM */
export const useUnmount = (effect: () => void) => {
    useEffect(() => {
        return effect;
    }, [effect])
}

/* call after props changed and after rendered to the DOM */
export const useChangePropsAfterMount = (effect: () => void, deps: unknown[] = []) => {
    useEffect(effect, [effect, ...deps])
}

export const useInit = <T>(clb: () => T): T => {
    const [_value] = useState<T>(clb);
    return _value;
};