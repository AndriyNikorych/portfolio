"use client";
import css from "@css/pages/Home/skills.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const REPEAT_COUNT = 4;

const rows = [
	["React", "Next.js", "TypeScript", "GSAP"],
	["Java Script", "CSS", "HTML", "ScrollTrigger"],
	["Tailwind CSS", "Node.js", "Express.js", "Strapi.io"]
];

export function Skills() {
	const t = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const inners = containerRef.current?.querySelectorAll<HTMLDivElement>(`.${css.rowInner}`);

			if (!inners) return;

			inners?.forEach((inner, index) => {
				const isReverse = index === 1;
				const items = inner.querySelectorAll<HTMLSpanElement>(`.${css.skill}`);
				const itemsPerSet = items.length / REPEAT_COUNT;
				const gap = parseFloat(getComputedStyle(inner).columnGap) || 0;

				let singleSetWidth = 0;
				for (let i = 0; i < itemsPerSet; i++) {
					singleSetWidth += items[i].offsetWidth;
				}
				singleSetWidth += itemsPerSet * gap;

				gsap.fromTo(
					inner,
					{ x: isReverse ? -singleSetWidth : 0 },
					{
						x: isReverse ? 0 : -singleSetWidth,
						ease: "none",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.5
						}
					}
				);
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className={css.skills}>
			<div className={css.skillsTitleBlock}>
				<div className={css.titleWrapper}>
					<span className={css.sectionName}>◆ {t("home.toolkit")}</span>
					<h3 className={css.skillsTitle}>{t("home.skills1")}</h3>
					<h3 className={css.skillsSubTitle}>{t("home.skills2")}</h3>
				</div>
				<p className={css.skillsDescription}>{t("home.skillsDescription")}</p>
			</div>

			<div className={css.skillsMarquee} ref={containerRef}>
				{rows.map((row, rowIndex) => (
					<div key={rowIndex} className={css.rowWrapper} data-row={rowIndex}>
						<div className={css.rowInner}>
							{Array.from({ length: REPEAT_COUNT }, () => row)
								.flat()
								.map((skill, i) => (
									<span key={skill + "-" + i} className={css.skill}>
										{skill}
									</span>
								))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
