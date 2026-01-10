import { ReactNode } from "react";
import "@css/main.scss";
import { Fonts } from "@/assets/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={Fonts.variable}>{children}</body>
		</html>
	);
}
