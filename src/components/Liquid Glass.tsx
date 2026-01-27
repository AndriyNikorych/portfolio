import { ReactNode } from "react";
import css from "@css/component/liquidGlass.module.scss";
import cn from "classnames";

interface LiquidGlassProps {
	className?: string;
	classContent?: string;
	children?: ReactNode;
	withOverlay?: boolean;
}

export function LiquidGlass({ className, classContent, children, withOverlay = true }: LiquidGlassProps) {
	return (
		<div className={cn(css.liquidGlassWrapper, className)}>
			<div className={css.liquidGlassEffect} />
			{withOverlay && <div className={css.overlay} />}
			<div className={cn(css.glassContent, classContent)}>{children}</div>
			<svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
				<filter id="glassFilter">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.01 0.01"
						numOctaves="1"
						seed="5"
						result="turbulence"
					/>
					<feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
					<feDisplacementMap in="SourceGraphic" in2="softMap" scale="100" />
				</filter>
			</svg>
		</div>
	);
}
