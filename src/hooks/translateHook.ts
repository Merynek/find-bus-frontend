import {useTranslations} from 'next-intl';

export const useTranslate = <N extends Parameters<typeof useTranslations>[0]>(
    namespace?: N
) => {
    const t = useTranslations(namespace);

    return {
        t: t
    };
};