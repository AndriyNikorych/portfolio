import { Theme } from "@/components/ThemeSelector/LampSwitcher";
import { useTheme } from "next-themes";
import Sun from "@/assets/svg/sun.svg";
import Moon from "@/assets/svg/moon.svg";
import css from "@css/component/themeSelector.module.scss";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";

export function ThemeSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();
	const sunRef = useRef<HTMLDivElement>(null);
	const moonRef = useRef<HTMLDivElement>(null);
	const timeline = useRef<gsap.core.Timeline>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const onCLick = () => {
		const isDark = resolvedTheme === Theme.dark;
		const outgoing = isDark ? moonRef.current : sunRef.current;
		const incoming = isDark ? sunRef.current : moonRef.current;

		timeline.current = gsap.timeline();

		timeline.current
			.to(outgoing, {
				rotation: 180,
				scale: 0,
				duration: 0.3,
				ease: "power3.in"
			})
			.fromTo(
				incoming,
				{ rotation: 180, scale: 0 },
				{
					rotation: 0,
					scale: 1,
					duration: 0.3,
					ease: "power2.out"
				}
			);

		setTheme(isDark ? Theme.light : Theme.dark);
	};

	const isDark = mounted && resolvedTheme === Theme.dark;
	const isLight = mounted && resolvedTheme !== Theme.dark;

	return (
		<button onClick={onCLick} className={css.switcher} aria-label={"changeTheme"}>
			<div ref={sunRef} className={cn(isLight && css.active, css.icon)}>
				<Sun />
			</div>
			<div ref={moonRef} className={cn(isDark && css.active, css.icon)}>
				<Moon />
			</div>
		</button>
	);
}
