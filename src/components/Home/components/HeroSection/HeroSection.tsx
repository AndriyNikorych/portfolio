"use client";
import css from "@css/pages/Home/heroSection.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import { Avatar } from "@/components/Home/components/HeroSection/Avatar";
import { Services } from "@/components/Home/components/HeroSection/Services";
import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useHeroAnimations } from "@/components/Home/hooks/useHeroAnimations";

gsap.registerPlugin(ScrollToPlugin);

export function HeroSection() {
	const t = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const nameRef = useRef<HTMLSpanElement>(null);
	const underlineRef = useRef<HTMLDivElement>(null);
	const positionRef = useRef<HTMLHeadingElement>(null);

	useHeroAnimations({
		section: sectionRef,
		title: titleRef,
		name: nameRef,
		underline: underlineRef,
		position: positionRef
	});

	const scrollToWork = useCallback(() => {
		gsap.to(window, { scrollTo: "#work", duration: 0.3, ease: "power2.out" });
	}, []);

	return (
		<section className={css.heroSection} ref={sectionRef}>
			<div className={css.about}>
				<div className={css.hello}>
					<div className={css.titleContainer}>
						<h1 className={css.title} ref={titleRef}>
							{t("home.hello")}

							<div className={css.nameWrapper}>
								<span className={css.name} ref={nameRef}>
									{t("home.name")}
								</span>
								<div className={css.underline} ref={underlineRef} />
							</div>
						</h1>
					</div>

					<h2 className={css.position} ref={positionRef}>
						{t("home.position")}
					</h2>
				</div>

				<Services />

				<button className={css.scroll} onClick={scrollToWork} aria-label={"scroll to work"}>
					{t("home.scroll")} <span className={css.arrow}>↓</span>
				</button>
			</div>

			<Avatar />
		</section>
	);
}
