import {useTranslations} from 'next-intl';
import {useLocale} from "use-intl";

type ValidNamespace = Exclude<Parameters<typeof useTranslations>[0], undefined>;
type GlobalTranslator = ReturnType<typeof useTranslations<never>>;
type NamespacedTranslator<N extends ValidNamespace> = ReturnType<typeof useTranslations<N>>;

type UseTranslateReturnType =
    | { t: GlobalTranslator }
    | { t: NamespacedTranslator<ValidNamespace> };

export function useTranslate<N extends ValidNamespace>(
    namespace: N
): {t: NamespacedTranslator<N>};

export function useTranslate(): {t: GlobalTranslator};

export function useTranslate(
    namespace?: ValidNamespace
): UseTranslateReturnType {
    const t = useTranslations(namespace as ValidNamespace);

    return {
        t: t as GlobalTranslator | NamespacedTranslator<ValidNamespace>
    } as UseTranslateReturnType;
}

export const useCurrentLocale = () => {
    return useLocale();
}