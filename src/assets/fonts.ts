import { JetBrains_Mono } from "next/font/google";

export const Fonts = JetBrains_Mono({
	subsets: ["latin", "latin-ext"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	display: "swap",
	variable: "--monoFontFamily"
});
