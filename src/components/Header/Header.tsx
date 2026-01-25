"use client";
import css from "@css/component/header.module.scss";
import HomeIcon from "@/assets/svg/home.svg";
import { Settings } from "@/components/Header/Settings";
import { useTranslation } from "@/locale/useTranslation";
import { NavigationItem } from "@/components/Header/NavigationItem";
import { useLocale } from "use-intl";

export function Header() {
	const t = useTranslation();
	const locale = useLocale();

	return (
		<header className={css.header}>
			<div className={css.headerContent}>
				<nav className={css.navigation}>
					<ul className={css.menu}>
						<NavigationItem url={`/${locale}`} icon={<HomeIcon />} />
						<NavigationItem url={`/${locale}/about`} title={t("navigation.about")} />
						<NavigationItem url={`/${locale}/projects`} title={t("navigation.projects")} />
						<NavigationItem url={`/${locale}/contacts`} title={t("navigation.contacts")} />
					</ul>
				</nav>
				<Settings />
			</div>
		</header>
	);
}
