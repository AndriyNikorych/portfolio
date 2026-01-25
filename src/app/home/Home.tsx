"use client";
import { Header } from "@/components/Header/Header";
import css from "@css/pages/home.module.scss";
import { AboutMe } from "@/app/home/components/AboutMe";
import { ContactList } from "@/app/home/components/ContactList";
import { TechStack } from "@/app/home/components/TechStack";
import ReactIcon from "@/assets/svg/react.svg";
import { useTranslation } from "@/locale/useTranslation";

export function Home() {
	const t = useTranslation("home");

	return (
		<div className={css.root}>
			<Header />
			<div className={css.content}>
				<h1 className={css.title}>{t("title")}</h1>
				<ContactList />
				<AboutMe />
			</div>
			<TechStack />
			<div className={css.reactIcon}>
				<ReactIcon />
			</div>
		</div>
	);
}
