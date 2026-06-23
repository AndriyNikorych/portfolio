import { ReactNode } from "react";
import { getMessages } from "@/i18n/getMessages";
import { I18nProvider } from "@/i18n/i18nProvider";
import { defaultLocale, generateStaticParams, locales, Locale } from "@/i18n/config";
export { generateStaticParams };

export default async function LangLayout({
	children,
	params
}: {
	children: ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang: rawLang } = await params;
	const lang: Locale = locales.includes(rawLang as Locale) ? (rawLang as Locale) : defaultLocale;
	const messages = await getMessages(lang);
	return (
		<I18nProvider locale={lang} messages={messages}>
			{children}
		</I18nProvider>
	);
}
