import { ReactNode } from "react";
import { TravelFont } from "@/assets/fonts";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<head>
				<link rel="preload" as="image" href="/images/travel/maldive.webp" />
			</head>
			<div className={TravelFont.variable}>{children}</div>
		</>
	);
}
