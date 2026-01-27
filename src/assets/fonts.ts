import { Zalando_Sans_Expanded } from "next/font/google";

export const Fonts = Zalando_Sans_Expanded({
	subsets: ["latin", "latin-ext"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	display: "swap",
	variable: "--fontFamily"
});
