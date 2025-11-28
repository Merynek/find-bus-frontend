import {routing} from '@/src/i18n/routing';
import React, {useTransition} from "react";
import {usePathname, useRouter} from '@/src/i18n/navigation';
import {useParams} from "next/navigation";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {LOCALES} from "@/src/enums/locale";
import {ContextMenu, IContextItem} from "@/src/components/components/context-menu/context-menu";
import {Text} from "@/src/components/components/texts/text";
import {FontSize, FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "@/src/components/components/icon/icon";
import {FlexGap} from "@/src/enums/layout.enum";

export const LocaleSwitcherSelect = () => {
    const locale = useCurrentLocale();
    const router = useRouter();
    const [, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    const _getLocaleText = (_locale: LOCALES) => {
        switch (_locale) {
            case LOCALES.cs_CZ:
                return "Čeština";
            case LOCALES.en_US:
                return "English";
        }
    }

    const createContextItems = (): IContextItem[] => {
        return routing.locales.map((cur) => {
                return {
                    label: _getLocaleText(cur),
                    onClick: () => {
                        startTransition(() => {
                            router.replace(
                                // @ts-expect-error -- TypeScript will validate that only known `params`
                                // are used in combination with a given `pathname`. Since the two will
                                // always match for the current route, we can skip runtime checks.
                                {pathname, params},
                                {locale: cur}
                            );
                        });
                    }
                }
        });
    }

    return <ContextMenu
        id={"locale-switcher-select"}
        opener={<LayoutFlexRow gap={FlexGap.SMALLEST_4}>
            <Icon icon={IconType.LANGUAGE}/>
            <Text text={_getLocaleText(locale)} fontSize={FontSize.BASE_14} fontWeight={FontWeight.SEMIBOLD}/>
        </LayoutFlexRow>}
        items={createContextItems()}
    />
}