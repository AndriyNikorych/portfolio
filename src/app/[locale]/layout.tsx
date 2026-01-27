import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/ThemeSelector/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLangParams } from "@/utilities/server";
import { setRequestLocale } from "next-intl/server";

export type LangParams = {
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: PropsWithChildren<LangParams>) {
	const { locale } = await getLangParams(params);

	setRequestLocale(locale);

	const messages = (await import(`../../locale/${locale}.json`)).default;

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
				{children}
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
