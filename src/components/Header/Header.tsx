"use client";
import css from "@css/component/header.module.scss";
import HomeIcon from "@/assets/svg/home.svg";
import { Settings } from "@/components/Header/Settings";
import { useTranslation } from "@/locale/useTranslation";
import { NavigationItem } from "@/components/Header/NavigationItem";
import { useLocale } from "next-intl";
import Burger from "@/assets/svg/burger.svg";
import Close from "@/assets/svg/close.svg";
import { useState } from "react";
import cn from "classnames";

export function Header() {
	const t = useTranslation();
	const locale = useLocale();

	const [open, setOpen] = useState(false);

	const homeEl = (
		<div className={css.homeEl}>
			<HomeIcon />
			<span className={css.homeText}>{t("navigation.home")}</span>
		</div>
	);

	return (
		<header className={css.header}>
			<button className={css.mobileMenu} onClick={() => setOpen(!open)}>
				<Burger />
			</button>
			<div className={cn(css.headerContent, { [css.open]: open })}>
				<div className={css.close} onClick={() => setOpen(false)}>
					<Close />
				</div>
				<nav className={css.navigation}>
					<ul className={css.menu}>
						<NavigationItem url={`/${locale}`} el={homeEl} />
						<NavigationItem url={`/${locale}/about`} title={t("navigation.about")} />
						<NavigationItem url={`/${locale}/projects`} title={t("navigation.projects")} />
						<NavigationItem url={`/${locale}/contacts`} title={t("navigation.contacts")} />
					</ul>
				</nav>
				<Settings onClose={() => setOpen(false)} />
			</div>
		</header>
	);
}
