"use client";
import css from "@css/pages/Home/home.module.scss";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSelector/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSelector/ThemeSwitcher";
import { LiquidGlass } from "@/components/Liquid Glass";
import { useCallback } from "react";

export const Header = () => {
	const scrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<LiquidGlass classes={{ root: css.header, glassContent: css.glassContent }}>
			<div className={css.headerContent}>
				<button className={css.elements} onClick={scrollToTop}>
					<Image src="/images/nik.webp" alt="Nik" width={40} height={40} className={css.logo} />
					<div className={css.name}>nikorych.dev</div>
				</button>

				<div className={css.elements}>
					<LanguageSwitcher className={css.languageSelector} />
					<ThemeSwitcher />
				</div>
			</div>
		</LiquidGlass>
	);
};
