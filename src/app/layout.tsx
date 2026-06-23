import { ReactNode } from "react";
import "@css/main.scss";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeSelector/ThemeProvider";
import { Fonts } from "@/assets/fonts";
import { ExplorerLayer } from "@/components/Explorer/ExplorerLayer";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Andrii Nikorych — Front-End Developer</title>
				<link
					rel="preload"
					as="image"
					href="/images/avatar-hero.webp"
					type="image/webp"
					media="(min-width: 571px)"
				/>
				<link
					rel="preload"
					as="image"
					href="/images/avatar-hero-sm.webp"
					type="image/webp"
					media="(max-width: 570px)"
				/>
			</head>
			<body className={Fonts.variable}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Analytics />
					<main>{children}</main>
				</ThemeProvider>
				<ExplorerLayer />
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
		metadataBase: new URL("https://nikorych.dev/"),
		openGraph: {
			title: "Andrii Nikorych — Front-End Developer",
			description: "Portfolio of Andrii Nikorych, a Front-End Developer.",
			url: "https://nikorych-portfolio.vercel.app/",
			siteName: "Andrii Nikorych Portfolio",
			locale: "en_US",
			type: "website"
		},
		twitter: {
			title: "Andrii Nikorych — Front-End Developer",
			description: "Portfolio of Andrii Nikorych, a Front-End Developer."
		},
		robots: {
			index: true,
			follow: true
		}
	};
}
