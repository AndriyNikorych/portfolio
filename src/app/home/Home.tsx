"use client";

import css from "@css/pages/home.module.scss";
import { LampSwitcher } from "@/components/ThemeSelector/LampSwitcher";
import { useEffect, useRef } from "react";
import { HomePageContent } from "@/app/home/components/HomePageContent";
import { NextStepButton } from "@/app/home/components/NextStepButton";

export function Home() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function calcAnchorScreenPos() {
			if (!ref.current) return;
			const Iw = 2720;
			const Ih = 1568;
			const Vw = window.innerWidth;
			const Vh = window.innerHeight;
			const S = Math.max(Vw / Iw, Vh / Ih); // cover scale

			ref.current.style.setProperty("--posY", 180 * S + "px");
			ref.current.style.setProperty("--lampX", `${-265 * S}px`);
			ref.current.style.setProperty("--scale", S.toFixed(2));
		}
		calcAnchorScreenPos();

		window.addEventListener("resize", calcAnchorScreenPos);
		window.addEventListener("orientationchange", calcAnchorScreenPos);

		return () => {
			window.removeEventListener("resize", calcAnchorScreenPos);
			window.removeEventListener("orientationchange", calcAnchorScreenPos);
		};
	}, []);

	useEffect(() => {}, []);

	return (
		<div className={css.root}>
			<div className={css.home} ref={ref}>
				<LampSwitcher />
				<HomePageContent />
				<NextStepButton homeRef={ref} />
			</div>
		</div>
	);
}
