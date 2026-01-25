"use client";

import Sun from "@/assets/svg/sun.svg";
import Moon from "@/assets/svg/moon.svg";
import { useTheme } from "next-themes";
import css from "@/assets/styles/component/themeSelector.module.scss";
import { LiquidGlass } from "@/components/Liquid Glass";

export function ThemeSelector() {
	const { resolvedTheme, setTheme } = useTheme();

	const onCLick = () => {
		setTheme(resolvedTheme === "light" ? "dark" : "light");
	};

	return (
		<button onClick={onCLick} className={css.themeSelector}>
			<Sun className={css.sun} />
			<Moon className={css.moon} />
			<div className={css.selector} />
		</button>
	);
}
