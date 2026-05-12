"use client";

import css from "@/assets/styles/pages/travel.module.scss";
import { PhotoCards } from "./PhotoCards";
import { Footer } from "@/modules/travel/Footer";
import { VideoScrollSection } from "@/modules/travel/ScrollVideo";
import { FirstFrame } from "@/modules/travel/FirstFrame";
import { FascinatingFacts } from "@/modules/travel/FascinatingFacts";

export function Travel() {
	return (
		<section className={css.root}>
			<FirstFrame />
			<FascinatingFacts />
			<VideoScrollSection />
			<PhotoCards />
			<Footer />
		</section>
	);
}
