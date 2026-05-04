import { ReactNode } from "react";

export default function TahoeLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<head>
				<link rel="preload" as="image" href="/images/backgounds/tahoe_background_light.webp" />
				<link rel="preload" as="image" href="/images/backgounds/tahoe_background_dark.webp" />
			</head>
			{children}
		</>
	);
}
