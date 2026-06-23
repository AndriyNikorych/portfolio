import { ReactNode } from "react";
import { Room } from "@/assets/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<link rel="preload" as="image" href="/images/backgounds/background_day.webp" />
			<link rel="preload" as="image" href="/images/backgounds/background_night.webp" />
			<div className={Room.variable}>{children}</div>
		</>
	);
}
