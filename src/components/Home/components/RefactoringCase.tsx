"use client";
import css from "@/assets/styles/pages/Home/refactoringCase.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import Alarm from "@/assets/svg/alarm.svg";
import Next from "@/assets/svg/nextjs.svg";
import Arrow from "@/assets/svg/arrow.svg";
import { Card } from "@/components/Home/components/Card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TitleBlock } from "@/components/Home/components/TitleBlock";

gsap.registerPlugin(ScrollTrigger);

export function RefactoringCase() {
	const t = useTranslation();
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const beforeTexts = gsap.utils.toArray<HTMLElement>(`.${css.beforeBlock} .${css.text}`);
			const afterItems = gsap.utils.toArray<HTMLElement>(`.${css.afterBlock} .${css.listItem}`);

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%"
				}
			});

			beforeTexts.forEach((text, i) => {
				tl.fromTo(
					text,
					{ backgroundSize: "0% 1.5px" },
					{ backgroundSize: "100% 1.5px", duration: 0.4, ease: "power2.inOut" }
				);

				if (afterItems[i]) {
					tl.fromTo(
						afterItems[i],
						{ opacity: 0, x: -10 },
						{ opacity: 1, x: 0, duration: 0.3, delay: 0.15, ease: "power2.out" }
					);
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className={css.refactoringCase} ref={sectionRef}>
			<TitleBlock
				title={t("home.refactoringCaseTitle")}
				sectionName={t("home.refactoringCaseSection")}
				subTitle={t("home.refactoringCaseSubTitle")}
			/>

			<p className={css.description}>{t("home.refactoringCaseDescription")}</p>

			<div className={css.content}>
				<Card className={css.beforeBlock}>
					<div className={css.cardTitleWrapper}>
						<div className={css.icon}>
							<Alarm />
						</div>

						<div className={css.cardTitle}>
							<h4 className={css.grey}>{t("global.before")}</h4>
							<h3>{t("home.beforeTitle")}</h3>
						</div>
					</div>
					<ul className={css.list}>
						{Array.from({ length: 4 }).map((_, i) => (
							<li key={i} className={css.listItem}>
								<span className={css.dot} />
								<span className={css.text}>{t(`home.beforeList${i + 1}`)}</span>
							</li>
						))}
					</ul>
				</Card>

				<div className={css.separator}>
					<Arrow />
				</div>

				<Card className={css.afterBlock} withGradient>
					<div className={css.cardTitleWrapper}>
						<div className={css.icon}>
							<Next />
						</div>

						<div className={css.cardTitle}>
							<h4 className={css.uppercase}>{t("global.after")}</h4>
							<h3 className={css.white}>{t("home.afterTitle")}</h3>
						</div>
					</div>

					<ul className={css.list}>
						{Array.from({ length: 4 }).map((_, i) => (
							<li key={i} className={css.listItem}>
								<span className={css.dot} />
								<span className={css.text}>{t("home.afterList" + (i + 1))}</span>
							</li>
						))}
					</ul>
				</Card>
			</div>
		</section>
	);
}
