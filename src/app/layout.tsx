import { ReactNode } from "react";
import "@css/main.scss";
import { Fonts } from "@/assets/fonts";
import { I18nInit } from "@/i18n/I18nInit";
import { ThemeProvider } from "@/components/ThemeSelector/ThemeProvider";
import type { Metadata } from "next";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang={"en"} suppressHydrationWarning>
			<>
				<link rel="preload" as="image" href="/images/backgounds/background_day.webp" />
				<link rel="preload" as="image" href="/images/backgounds/background_night.webp" />
			</>
			<body className={Fonts.variable}>
				<I18nInit />
				<ThemeProvider attribute="class" defaultTheme={"system"} enableSystem>
					<main>{children}</main>
				</ThemeProvider>

				<div id="explorer-portal" />
			</body>
		</html>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: {
			default: "Andrii Nikorych — Front-End Developer",
			template: "%s | Andrii Nikorych"
		},
		description: "Portfolio of Andrii Nikorych, a Front-End Developer.",
		metadataBase: new URL("https://nikorych-portfolio.vercel.app/"),
		openGraph: {
			title: "Andrii Nikorych — Front-End Developer",
			description: "Portfolio of Andrii Nikorych, a Front-End Developer.",
			url: "https://nikorych-portfolio.vercel.app/",
			siteName: "Andrii Nikorych Portfolio",
			locale: "en_US",
			type: "website"
		},
		twitter: {
			card: "summary_large_image",
			title: "Andrii Nikorych — Front-End Developer",
			description: "Portfolio of Andrii Nikorych, a Front-End Developer."
		},
		robots: {
			index: true,
			follow: true
		}
	};
}
