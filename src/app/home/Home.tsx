"use client";
import { Header } from "@/components/Header/Header";
import css from "@css/pages/home.module.scss";
import { AboutMe } from "@/app/home/components/AboutMe";
import { ContactList } from "@/app/home/components/ContactList";
import { TechStack } from "@/app/home/components/TechStack";
import { useTranslation } from "@/locale/useTranslation";
import { Image } from "next/dist/client/image-component";

export function Home() {
	const t = useTranslation("home");

	return (
		<div className={css.root}>
			<Header />

			<div className={css.container}>
				<div className={css.content}>
					<h1 className={css.title}>{t("title")}</h1>
					<ContactList />
					<AboutMe />

					<TechStack />
				</div>

				<Image
					src={"/portfolio/images/avatar.webp"}
					alt={"avatar"}
					width={300}
					height={720}
					className={css.avatar}
				/>
			</div>

			{/*<div className={css.reactIcon}>*/}
			{/*	<ReactIcon />*/}
			{/*</div>*/}
		</div>
	);
}
