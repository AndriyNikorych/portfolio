import { ReactNode } from "react";
import css from "@css/component/liquidGlass.module.scss";
import cn from "classnames";

type LiquidGlassType = {
	classes?: { root?: string; effect?: string; overlay?: string; glassContent?: string };
	children?: ReactNode;
	scale?: number;
	seed?: number;
};

export function LiquidGlass({ classes, children, scale = 150, seed = 5 }: LiquidGlassType) {
	return (
		<div className={cn(css.liquidGlassWrapper, classes?.root)}>
			<div className={cn(css.liquidGlassEffect, classes?.effect)} />
			<div className={cn(css.overlay, classes?.overlay)} />
			<div className={cn(css.glassContent, classes?.glassContent)}>{children}</div>
			<svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
				<filter id="glassFilter">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.01 0.01"
						numOctaves="1"
						seed={seed}
						result="turbulence"
					/>
					<feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
					<feDisplacementMap in="SourceGraphic" in2="softMap" scale={scale} />
				</filter>
			</svg>
		</div>
	);
}
