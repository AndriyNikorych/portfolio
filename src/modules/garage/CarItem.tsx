import css from "@css/pages/garage.module.scss";
import { Image } from "next/dist/client/image-component";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cn from "classnames";

gsap.registerPlugin(ScrollTrigger);

type CarItemProps = {
	name: string;
	model: string;
	image: { src: string; width: number; height: number };
	power: number;
	time: number;
	speed: number;
	description: string;
	position: string;
};

export function CarItem({ name, model, image, power, time, speed, description, position }: CarItemProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const startPos = position === "left" ? -1000 : 1000;

	useEffect(() => {
		if (!imageRef.current || !wrapperRef.current) return;

		gsap.fromTo(
			imageRef.current,
			{
				x: startPos
			},
			{
				x: 0,
				opacity: 1,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: wrapperRef.current,
					start: "center bottom",
					end: "center 15%",
					toggleActions: "play none none none",
					scrub: true
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach((t) => {
				if (t.trigger === wrapperRef.current) t.kill();
			});
		};
	}, [startPos]);

	return (
		<div className={cn(css.carWrapper, css[position])} ref={wrapperRef}>
			<div className={css.imageWrapper}>
				<Image
					src={image.src}
					alt={name}
					width={image.width}
					height={image.height}
					className={css.carImage}
					ref={imageRef}
				/>
			</div>
			<div className={css.carInfoWrapper}>
				<div className={css.carInfo}>
					<div className={css.carNaming}>
						<div className={css.carName}>{name}</div>
						<div className={css.carModel}>{model}</div>
					</div>

					<div className={css.carDescription}>{description}</div>

					<div className={css.carCharacteristics}>
						<div className={css.carCharacteristic}>
							<div className={css.name}>POWER output:</div>
							<div className={css.value}>{power} hp</div>
						</div>

						<div className={css.carCharacteristic}>
							<div className={css.name}>0 - 100 km/h:</div>
							<div className={css.value}>{time} seconds</div>
						</div>

						<div className={css.carCharacteristic}>
							<div className={css.name}>Max speed:</div>
							<div className={css.value}>{speed} km/h</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
