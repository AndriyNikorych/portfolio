import { Atkinson_Hyperlegible_Mono } from "next/font/google";

export const Fonts = Atkinson_Hyperlegible_Mono({
	variable: "--standardFontFamily",
	display: "swap",
	style: "normal",
	preload: true,
	fallback: ["Helvetica", "Arial", "sans-serif"],
	subsets: ["latin", "latin-ext"],
	weight: ["200", "300", "400", "500", "600", "700", "800"]
});
