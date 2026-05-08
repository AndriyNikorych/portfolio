import { Arimo, Rouge_Script, Roboto_Flex } from "next/font/google";

export const Fonts = Arimo({
	subsets: ["latin", "latin-ext"],
	weight: ["400", "600", "700"],
	display: "swap",
	variable: "--fontFamily"
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
