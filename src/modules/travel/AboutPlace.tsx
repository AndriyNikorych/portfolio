import css from "@/assets/styles/pages/travel.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutPlace() {
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!gridRef.current) return;

		const photos = gridRef.current.querySelectorAll(`.${css.photoWrapper}`);
		const triggers: ScrollTrigger[] = [];

		photos.forEach((photo, i) => {
			const anim = gsap.fromTo(
				photo,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					delay: i * 0.3,
					scrollTrigger: {
						trigger: photo,
						start: "top bottom",
						end: "bottom bottom",
						toggleActions: "play none none none"
					}
				}
			);
			if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
		});

		return () => {
			triggers.forEach((t) => t.kill());
		};
	}, []);

	return (
		<div className={css.aboutPlace}>
			<div className={css.aboutPlaceContent}>
				<h2 className={css.aboutPlaceTitle}>Holidays in the Maldives</h2>
				<p>
					A vacation in the Maldives represents luxury, prestige, and excellence in every detail.
					This is the well-deserved reputation of these truly heavenly islands. It is a chain of
					picturesque coral islands, each hosting a resort that has been harmoniously blended into
					the stunning Maldivian landscapes.
				</p>
				<p>
					The nature itself—emerald tropical vegetation, azure waters, and snow-white beaches—is
					what draws tourists from all over the globe.
				</p>
				<p>
					Maldivian resorts are the ultimate destination for a honeymoon. Couples and newlyweds
					often choose these islands to spend unforgettable days, or even to renew their vows of
					love and fidelity during a special ceremony. The signature feature of this popular
					destination is the unique atmosphere of ultimate relaxation, bliss, and pure pleasure that
					will fill your entire stay, no matter how long your trip lasts.
				</p>
			</div>

			<div className={css.photoBlock}>
				<div className={css.photoGrid} ref={gridRef}>
					<div className={css.photoWrapper}>
						<Image
							src="/images/travel/maldives3.webp"
							alt="hotel"
							width={462}
							height={1000}
							className={css.photo}
						/>
					</div>
					<div className={css.photoWrapper}>
						<Image
							src="/images/travel/maldives1.webp"
							alt="hotel"
							width={890}
							height={500}
							className={css.photo}
						/>
					</div>
					<div className={css.photoWrapper}>
						<Image
							src="/images/travel/maldives2.webp"
							alt="hotel"
							width={740}
							height={500}
							className={css.photo}
						/>
					</div>
					<div className={css.photoWrapper}>
						<Image
							src="images/travel/maldives4.webp"
							alt="hotel"
							width={889}
							height={500}
							className={css.photo}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
