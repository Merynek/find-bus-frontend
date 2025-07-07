import {useRef} from "react";
import {computed, IComputedValue} from "mobx";

export function useComputed<T>(func: () => T): T {
    const computedFieldRef = useRef<IComputedValue<T>|null>(null);

    if (!computedFieldRef.current) {
        computedFieldRef.current = computed(func);
    }

    return computedFieldRef.current.get();
}