import { useEffect, useRef, useState } from "react";
import css from "@/assets/styles/pages/travel.module.scss";
import Plane from "@/assets/svg/travel/plane.svg";
import Point from "@/assets/svg/travel/point.svg";
import gsap from "gsap";

interface Props {
	progress: number;
	isReady: boolean;
}

const MIN_DISPLAY_MS = 1800;

export function TravelLoader({ progress, isReady }: Props) {
	const [visible, setVisible] = useState(true);
	const mountTime = useRef(Date.now());
	const tl = useRef<gsap.core.Timeline | null>(null);
	const planeRef = useRef<HTMLDivElement>(null);
	const loaderRef = useRef<HTMLDivElement>(null);
	const progressObj = useRef({ value: 0 });

	useEffect(() => {
		gsap.to(progressObj.current, {
			value: progress,
			duration: 1.5,
			ease: "power2.out",
			overwrite: true,
			onUpdate: () => {
				if (planeRef.current) {
					const pos = 10 + progressObj.current.value * 0.9;
					planeRef.current.style.left = `calc(${pos}% - ${pos} * 90px / 100)`;
				}
			}
		});
	}, [progress]);

	useEffect(() => {
		if (isReady) return;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isReady]);

	useEffect(() => {
		if (!isReady) return;
		const time = Math.max(0, MIN_DISPLAY_MS - (Date.now() - mountTime.current));

		const timeout = setTimeout(() => {
			tl.current = gsap.timeline();
			tl.current.to(loaderRef.current, {
				opacity: 0,
				duration: 1.2,
				ease: "power2.out",
				onComplete: () => setVisible(false)
			});
		}, time);

		return () => {
			tl.current?.kill();
			clearTimeout(timeout);
		};
	}, [isReady]);

	if (!visible) return null;

	return (
		<div className={css.loader} ref={loaderRef}>
			<h2 className={css.loaderText}>
				Loading
				<span className={css.dot}>.</span>
				<span className={css.dot}>.</span>
				<span className={css.dot}>.</span>
			</h2>

			<div className={css.loaderProgress}>
				<div className={css.plane} ref={planeRef}>
					<Plane />
				</div>
				<div className={css.startPoint}>
					<Point />
				</div>
				<div className={css.endPoint}>
					<Point />
				</div>
			</div>
		</div>
	);
}
