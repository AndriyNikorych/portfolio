"use client";

import css from "@/assets/styles/pages/travel.module.scss";
import { PhotoCards } from "./PhotoCards";
import { Footer } from "@/modules/travel/Footer";
import { VideoScrollSection } from "@/modules/travel/ScrollVideo";
import { FirstFrame } from "@/modules/travel/FirstFrame";
import { FascinatingFacts } from "@/modules/travel/FascinatingFacts";
import { useImagePreloader } from "@/modules/travel/useImagePreloader";
import { TravelLoader } from "@/modules/travel/TravelLoader";

export function Travel() {
	const { progress, isReady } = useImagePreloader();

	return (
		<>
			<TravelLoader isReady={isReady} progress={progress} />
			<section className={css.root}>
				<FirstFrame />
				<FascinatingFacts />
				<VideoScrollSection />
				<PhotoCards />
				<Footer />
			</section>
		</>
	);
}
