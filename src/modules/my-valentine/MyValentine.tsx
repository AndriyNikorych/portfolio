"use client";
import css from "@css/pages/myValentine.module.scss";
import { Image } from "next/dist/client/image-component";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { HeartRain } from "@/modules/my-valentine/LoveRain";
import { LoveCard } from "@/modules/my-valentine/LoveCard";

const since = new Date("2023-04-01").getTime();
const year = new Date().getFullYear();
const wName = "Julia";
const mName = "Andrii";
const shortWName = wName.toUpperCase().slice(0, 1);
const shortMName = mName.toUpperCase().slice(0, 1);

export function MyValentine() {
	const [open, setOpen] = useState(false);
	const topRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline>(null);

	const onLetterWrapperClick = (el: React.MouseEvent<HTMLDivElement>) => {
		const wax = topRef.current?.querySelector("." + css.waxSeal);
		const text = topRef.current?.querySelector("." + css.waxText);
		if (!wax || !text) return;

		timelineRef.current = gsap.timeline({ onComplete: () => setOpen(true) });
		timelineRef.current
			.to(topRef.current, { duration: 1, rotateX: 170 }, 0)
			.set(wax, { duration: 0.1, zIndex: -1, delay: 0.3 }, 0)
			.to(text, { duration: 0.5, opacity: 0 }, 0)
			.set(topRef.current, { zIndex: 1 });

		timelineRef.current
			.to(topRef.current, { duration: 1.5, opacity: 0 })
			.to(bottomRef.current, { duration: 1.5, opacity: 0 }, "<")
			.set(el.currentTarget, { display: "none" });
	};

	useEffect(() => {
		if (timelineRef.current) {
			timelineRef.current.kill();
		}
	}, []);

	return (
		<div className={css.root}>
			{open && <HeartRain />}
			<div className={css.header}>
				<div className={css.name}>{shortWName + "."}</div>
				<div className={css.year}>{"Valentine " + year}</div>
			</div>
			<div className={css.content}>
				<div className={css.letterWrapper} onClick={onLetterWrapperClick}>
					<div className={css.top} ref={topRef}>
						<div className={css.topPart} />
						<Image
							src={"/portfolio/images/waxSeal.webp"}
							alt={"wax seal"}
							width={200}
							height={160}
							className={css.waxSeal}
							loading="eager"
						/>
						<span className={css.waxText}>{shortWName + "&" + shortMName}</span>
					</div>
					<div className={css.bottom} ref={bottomRef} />
				</div>
				<LoveCard
					womanName={wName}
					manName={mName}
					startingDate={since}
					imageSrc={"/portfolio/images/7E0A0384.webp"}
				/>
			</div>
		</div>
	);
}
