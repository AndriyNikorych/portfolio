import { ReactNode } from "react";

export default function TahoeLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<link rel="preload" as="image" href="/images/backgounds/tahoe_background_light.webp" />
			<link rel="preload" as="image" href="/images/backgounds/tahoe_background_dark.webp" />
			{children}
		</>
	);
}
