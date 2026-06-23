import { Arimo, Rouge_Script, Roboto_Flex, Inter } from "next/font/google";

export const Fonts = Inter({
	subsets: ["latin", "latin-ext"],
	style: ["normal", "italic"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--fontFamily"
});

export const Room = Arimo({
	subsets: ["latin", "latin-ext"],
	weight: ["400", "600", "700"],
	display: "swap",
	variable: "--roomFamily"
});

export const TravelFont = Roboto_Flex({
	subsets: ["latin", "latin-ext"],
	weight: ["400", "700", "900"],
	display: "swap",
	variable: "--travelFontFamily"
});

export const ValentineFont = Rouge_Script({
	subsets: ["latin"],
	weight: ["400"],
	display: "swap",
	variable: "--valentineFont"
});
