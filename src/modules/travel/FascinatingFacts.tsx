import css from "@/assets/styles/pages/travel.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import useMediaQuery from "@mui/material/useMediaQuery";

export function FascinatingFacts() {
	const containerRef = useRef<HTMLDivElement>(null);
	const media = useMediaQuery("(max-width: 700px)");

	useEffect(() => {
		if (media) return;
		const ctx = gsap.context(() => {
			const textBlocks = containerRef.current!.querySelectorAll<HTMLElement>(`.${css.factsText}`);
			const imgs = containerRef.current!.querySelectorAll<HTMLElement>(`.${css.factImageWrapper}`);

			textBlocks.forEach((el, i) => {
				const yFrom = 80 + (i % 3) * 30; // 80 / 110 / 140
				const yTo = -20 - (i % 3) * 15; // slight overshoot creates depth

				gsap.fromTo(
					el,
					{ y: yFrom },
					{
						y: yTo,
						ease: "none",
						scrollTrigger: {
							trigger: el,
							start: "top 95%",
							end: "top 25%",
							scrub: 1
						}
					}
				);
			});

			const speeds = [110, -5, 90, -50, 150, -50, 90, -40];
			const dir = [1, 1, -1, -1, 1, 1, -1, 0];

			imgs.forEach((el, i) => {
				const offset = speeds[i % speeds.length];
				const d = dir[i];

				gsap.fromTo(
					el,
					{ y: offset, x: d * 10, scale: 0.92 },
					{
						y: -offset * 0.4,
						x: 0,
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: el,
							start: "top bottom",
							end: "bottom top",
							scrub: true
						}
					}
				);
			});
		}, containerRef);

		return () => ctx.revert();
	}, [media]);

	return (
		<div className={css.facts} ref={containerRef}>
			{facts.map((fact) => (
				<div className={css.factsText} key={fact.title}>
					<h3 className={css.title}>{fact.title}</h3>
					<p className={css.fact}>{fact.text}</p>
				</div>
			))}
			{images.map((img) => {
				return (
					<Image
						src={img.src}
						alt={img.alt}
						className={css.factImageWrapper}
						width={img.width}
						height={img.height}
						key={img.src}
						style={{
							["--grid"]: `${img.rowS} / ${img.colS} / ${img.rowE} / ${img.colE}`
						}}
					/>
				);
			})}
		</div>
	);
}

const facts = [
	{
		title: "99% Water",
		text: "The Maldives consists of nearly 1,200 coral islands, but only 1% of the territory is land. You are quite literally surrounded by the wonders of the ocean."
	},
	{
		title: "The World’s Flattest Country",
		text: "The highest point is only about 2.4 meters above sea level. This unique geography creates an unparalleled feeling of being at one with the water."
	},
	{
		title: "Sand That Stays Cool",
		text: "Unlike quartz sand, Maldivian sand is made of coral. It remains pleasantly cool to the touch, even under the intense midday sun."
	},
	{
		title: "Home to Giants",
		text: "This is one of the few places where you can swim with the world’s largest fish—the Whale Shark. They are gentle giants that feed on plankton and are often happy to share the water with divers."
	},
	{
		title: "Stars Beneath Your Feet",
		text: 'On certain islands, you can witness the "Sea of Stars." This is caused by bioluminescent plankton that lights up the waves with a magical blue glow at night.'
	}
];

const images = [
	{
		src: "/images/travel/facts/1.webp",
		alt: "1",
		width: 870,
		height: 600,
		colS: 2,
		colE: 3,
		rowS: 1,
		rowE: 3
	},
	{
		src: "/images/travel/facts/3.webp",
		alt: "3",
		width: 600,
		height: 400,
		colS: 2,
		colE: 3,
		rowS: 3,
		rowE: 4
	},
	{
		src: "/images/travel/facts/2.webp",
		alt: "2",
		width: 450,
		height: 800,
		colS: 1,
		colE: 2,
		rowS: 2,
		rowE: 4
	},
	{
		src: "/images/travel/facts/4.webp",
		alt: "4",
		width: 750,
		height: 800,
		colS: 1,
		colE: 2,
		rowS: 4,
		rowE: 7
	},
	{
		src: "/images/travel/facts/5.webp",
		alt: "5",
		width: 1055,
		height: 700,
		colS: 1,
		colE: 2,
		rowS: 8,
		rowE: 10
	},
	{
		src: "/images/travel/facts/6.webp",
		alt: "6",
		width: 450,
		height: 800,
		colS: 2,
		colE: 3,
		rowS: 7,
		rowE: 10
	},
	{
		src: "/images/travel/facts/7.webp",
		alt: "7",
		width: 1200,
		height: 800,
		colS: 1,
		colE: 2,
		rowS: 11,
		rowE: 12
	},
	{
		src: "/images/travel/facts/8.webp",
		alt: "8",
		width: 777,
		height: 518,
		colS: 2,
		colE: 3,
		rowS: 5,
		rowE: 7
	},
	{
		src: "/images/travel/facts/9.webp",
		alt: "9",
		width: 800,
		height: 533,
		colS: 2,
		colE: 3,
		rowS: 11,
		rowE: 12
	}
];
