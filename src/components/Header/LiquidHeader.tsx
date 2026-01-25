"use client";
import css from "@css/component/header.module.scss";
import Link from "next/dist/client/link";
import HomeIcon from "@/assets/svg/home.svg";
import { Settings } from "@/components/Header/Settings";
import { useTranslation } from "@/locale/useTranslation";
import { NavigationItem } from "@/components/Header/NavigationItem";
import { LiquidGlass } from "@/components/Liquid Glass";

export function LiquidHeader() {
	const t = useTranslation();

	return (
		<header className={css.header}>
			<LiquidGlass className={css.headerLiquidGlass}>
				<div className={css.headerContent}>
					<nav className={css.navigation}>
						<ul className={css.menu}>
							<NavigationItem url={"/"} icon={<HomeIcon />} />
							<NavigationItem url={"/about"} title={t("navigation.about")} />
							<NavigationItem url={"/projects"} title={t("navigation.projects")} />
							<NavigationItem url={"/contacts"} title={t("navigation.contacts")} />
						</ul>
					</nav>
					<Settings />
				</div>
			</LiquidGlass>
		</header>
	);
}
