"use client";
import Layers from "@/assets/svg/layers.svg";
import Performance from "@/assets/svg/performance.svg";
import Lightning from "@/assets/svg/lightning.svg";
import css from "@/assets/styles/pages/Home/home.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import { Card } from "@/components/Home/components/Card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertiseCards = [
	{
		name: "Architecture",
		icon: <Lightning />
	},
	{
		name: "Animations",
		icon: <Layers />
	},
	{
		name: "Performance",
		icon: <Performance />
	}
];

export function SeniorExpertiseCards() {
	const t = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(`.${css.expertiseTitle}`, {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%"
				}
			});

			gsap.from(`.${css.listItem}`, {
				y: 50,
				opacity: 0,
				duration: 0.6,
				stagger: 0.15,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%"
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className={css.expertiseCards} ref={sectionRef}>
			<span className={css.expertiseTitle}>◈ {t("home.expertiseTitle")}</span>

			<ul className={css.list}>
				{expertiseCards.map((card) => {
					return (
						<li key={card.name}>
							<Card className={css.listItem}>
								<div className={css.icon}>{card.icon}</div>
								<div className={css.expertiseCardTitle}>
									{t(`home.expertise${card.name}`)}
								</div>
								<div className={css.expertiseCardDescription}>
									{t(`home.expertise${card.name}Description`)}
								</div>
							</Card>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
