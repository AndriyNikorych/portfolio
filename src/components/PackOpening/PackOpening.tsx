"use client";
import css from "@/assets/styles/component/packOpening.module.scss";
import { Header } from "@/components/PackOpening/Header";
import { CollectionProvider } from "@/components/PackOpening/CollenctionContext";
import { BoosterList } from "@/components/PackOpening/BoosterList";

export function PackOpening() {
	return (
		<CollectionProvider>
			<div className={css.root}>
				<Header />
				<BoosterList />
			</div>
		</CollectionProvider>
	);
}
