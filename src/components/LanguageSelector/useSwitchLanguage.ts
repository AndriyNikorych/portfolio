import { useLocale } from "@/i18n/i18nProvider";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/i18n/config";

export function useSwitchLanguage() {
	const { locale } = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const switchTo = (nextLocale: Locale) => {
		if (locale === nextLocale) return;
		const hasLocalePrefix = pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
		const newPath = hasLocalePrefix
			? pathname.replace(`/${locale}`, `/${nextLocale}`)
			: `/${nextLocale}${pathname}`;
		router.push(newPath);
	};

	return { switchTo, locale };
}
