"use client";
import { LoadingScreen } from "@/components/Macbook/LoadingScreen";
import css from "@css/pages/macbook.module.scss";
import { FooterNavBar } from "@/components/Macbook/FooterNavBar";

export function MacBook() {
	return (
		<div className={css.root}>
			<LoadingScreen />
			<div className={css.macBookContainer}>
				<FooterNavBar />
			</div>
		</div>
	);
}
