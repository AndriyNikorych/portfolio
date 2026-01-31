import { ReactNode } from "react";
import "@css/main.scss";
import { Fonts } from "@/assets/fonts";
import { I18nInit } from "@/i18n/I18nInit";
import { ThemeProvider } from "@/components/ThemeSelector/ThemeProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang={"en"} suppressHydrationWarning>
			<body className={Fonts.variable}>
				<I18nInit />
				<ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
					{children}
				</ThemeProvider>
				<div id="explorer-portal" />
			</body>
		</html>
	);
}
