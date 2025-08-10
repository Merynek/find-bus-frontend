import {EffectCallback, useEffect, useLayoutEffect, useRef, useState} from "react";


/* call once after rendered to the DOM */
export const useMount = (effect: () => void) => {
    useEffect(effect, [])
}

/* call after unmount from the DOM */
export const useUnmount = (effect: () => void) => {
    useEffect(() => {
        return effect;
    }, [])
}

/* call after props changed and after rendered to the DOM */
export const useChangePropsAfterMount = (effect: EffectCallback, props?: any[]) => {
    useEffect(effect, props)
}

/* call after props changed and after rendered to the DOM before rendered in real DOM */
export const useChangePropsBeforeMount = (effect: () => void, props: any[]) => {
    useLayoutEffect(effect, props)
}

/* get previous props */
export const usePrevious = (value: any) => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

/* constructor alternative in fnc components */
export const useConstructor = (callback = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callback();
    hasBeenCalled.current = true;
}

export const useInit = <T>(clb: () => T): T => {
    const [_value, _] = useState<T>(clb);
    return _value;
};