import { Locale } from "./config";

const cache = new Map<Locale, Record<string, any>>();

export async function getMessages(locale: Locale) {
	if (cache.has(locale)) return cache.get(locale)!;
	const messages = (await import(`../../public/locales/${locale}.json`)).default;
	cache.set(locale, messages);
	return messages;
}
