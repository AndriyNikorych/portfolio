import { Arimo, Rouge_Script } from "next/font/google";

export const Fonts = Arimo({
	subsets: ["latin", "latin-ext"],
	weight: ["400", "600", "700"],
	display: "swap",
	variable: "--fontFamily"
});

export const ValentineFont = Rouge_Script({
	subsets: ["latin"],
	weight: ["400"],
	display: "swap",
	variable: "--valentineFont"
});
