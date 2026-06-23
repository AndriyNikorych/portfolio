"use client";
import css from "@css/pages/Home/portfolio.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import { TitleBlock } from "@/components/Home/components/TitleBlock";
import Image from "next/image";
import Arrow from "@/assets/svg/arrow.svg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/dist/client/link";

const portfolio = [
	{
		name: "travel",
		url: "https://nikorych.dev/travel",
		previewImage: "/images/site/travel.webp"
	},
	{
		name: "officeRoom",
		url: "https://nikorych.dev/room",
		previewImage: "/images/site/room.webp"
	},
	{
		name: "kickstarter",
		url: "https://andriynikorych.github.io/kickstarter_project/",
		previewImage: "/images/site/laptop.webp"
	},
	{
		name: "miami",
		url: "https://andriynikorych.github.io/Miami_project/",
		previewImage: "/images/site/miami.webp"
	}
];

export function PortfolioList() {
	const t = useTranslation();
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				`.${css.portfolioItem}`,
				{ y: 150, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					stagger: 0.15,
					ease: "power3.in",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%"
					},
					onComplete() {
						gsap.set(this.targets(), { clearProps: "transform" });
						this.targets().forEach((el: HTMLElement) => el.classList.add(css.animated));
					}
				}
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className={css.portfolio} ref={sectionRef} id={"work"}>
			<TitleBlock
				title={t("portfolio.title")}
				subTitle={t("portfolio.subTitle")}
				sectionName={t("portfolio.sectionTitle")}
			/>

			<ul className={css.portfolioList}>
				{portfolio.map((item) => (
					<li key={item.name}>
						<Link href={item.url} className={css.portfolioItem}>
							<div className={css.arrow}>
								<Arrow />
							</div>
							<div className={css.imageWrapper}>
								<Image
									src={item.previewImage}
									alt={"preview image for site " + item.name}
									width={400}
									height={400}
									className={css.image}
								/>
							</div>

							<div className={css.info}>
								<span className={css.name}>{t("portfolio." + item.name + ".title")}</span>
								<span className={css.description}>
									{t("portfolio." + item.name + ".description")}
								</span>

								<span className={css.liveDemo}>
									{t("portfolio.liveDemo")} <Arrow />
								</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
