import "react";

declare module "react" {
	interface CSSProperties {
		[key: `--${string}`]: string | number | undefined;
	}
}

declare module "*.svg" {
	const content: React.FC<React.SVGProps<SVGElement>>;
	export default content;
}
