import { PropsWithChildren } from "react";
import "@css/main.scss";
import { Fonts } from "@/assets/fonts";
import { ThemeProvider } from "@/components/ThemeSelector/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLangParams } from "@/utilities/server";

export type LangParams = {
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: PropsWithChildren<LangParams>) {
	const { locale } = await getLangParams(params);
	const messages = (await import(`../../locale/${locale}.json`)).default;

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={Fonts.variable}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
						{children}
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
