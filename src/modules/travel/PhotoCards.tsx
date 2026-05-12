import css from "@/assets/styles/pages/travel.module.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoCard } from "@/modules/travel/PhotoCard";

gsap.registerPlugin(ScrollTrigger);

export function PhotoCards() {
	const gridRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!gridRef.current) return;

		const photos = gridRef.current.querySelectorAll(`.${css.photoWrapper}`);
		const triggers: ScrollTrigger[] = [];
		const total = photos.length;

		const landings = [
			{ x: -90, rotate: -14 },
			{ x: -70, rotate: -11 },
			{ x: -55, rotate: 20 },
			{ x: 80, rotate: 17 },
			{ x: 0, rotate: 0 }
		];

		const tl = gsap.timeline({
			ease: "power3.out",
			scrollTrigger: {
				trigger: gridRef.current,
				start: "top 50%",
				end: "top -50%",
				scrub: 4
			}
		});

		tl.fromTo(
			textRef.current,
			{ opacity: 0, y: 100 },
			{
				y: 0,
				opacity: 1,
				duration: 1.4
			}
		);

		photos.forEach((photo, i) => {
			const isLast = i === total - 1;
			const { x, rotate } = landings[i % landings.length];

			const anim = tl.fromTo(
				photo,
				{
					z: 1000,
					y: -400,
					xPercent: -50,
					yPercent: -50,
					rotation: 0,
					x: 0
				},
				{
					z: 0,
					y: 0,
					xPercent: -50,
					yPercent: -50,
					rotation: isLast ? 0 : rotate,
					x: isLast ? 0 : x,
					duration: 1.4,
					delay: i * 0.5,
					ease: "power2.out"
				}
			);
			if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
		});

		return () => {
			tl.kill();
			triggers.forEach((t) => t.kill());
		};
	}, []);

	return (
		<div className={css.photoCardsOuter}>
			<div className={css.photoCards}>
				<h2 className={css.photoCardsTitle} ref={textRef}>
					Create unforgettable memories that stay with you forever
				</h2>

				<div className={css.photoBlock} ref={gridRef}>
					{images.map((image, index) => (
						<PhotoCard key={index} {...image} />
					))}
				</div>
			</div>
		</div>
	);
}

const images = [
	{ src: "/images/travel/maldives1.webp", width: 890, height: 500 },
	{ src: "/images/travel/maldives2.webp", width: 740, height: 500 },
	{ src: "/images/travel/maldives3.webp", width: 462, height: 1000 },
	{ src: "/images/travel/maldives4.webp", width: 889, height: 500 },
	{ src: "/images/travel/maldives5.webp", width: 450, height: 300 }
];
