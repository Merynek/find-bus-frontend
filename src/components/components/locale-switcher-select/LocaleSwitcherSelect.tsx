import { routing } from '@/src/i18n/routing';
import {ChangeEvent, useTransition} from "react";
import { usePathname, useRouter } from '@/src/i18n/navigation';
import {useParams} from "next/navigation";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {LOCALES} from "@/src/utils/locale";

export const LocaleSwitcherSelect = () => {
    const locale = useCurrentLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as LOCALES;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                {pathname, params},
                {locale: nextLocale}
            );
        });
    }


    return <label>
        <p className="sr-only">SWITCH</p>
        <select
            className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
            defaultValue={locale}
            disabled={isPending}
            onChange={onSelectChange}
        >
            {routing.locales.map((cur) => (
                <option key={cur} value={cur}>
                    {cur}
                </option>
            ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
}