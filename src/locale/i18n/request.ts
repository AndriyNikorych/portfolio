export const locales = ["en", "uk"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
	const candidate = await requestLocale; // string | undefined

	const locale: AppLocale =
		candidate && (locales as readonly string[]).includes(candidate)
			? (candidate as AppLocale)
			: defaultLocale;

	return {
		locale,
		messages: (await import(`../${locale}.json`)).default
	};
});
