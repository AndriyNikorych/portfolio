export const locales = ["en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export enum LOCALE_ENUM {
	EN = "en",
	UK = "uk"
}

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}
