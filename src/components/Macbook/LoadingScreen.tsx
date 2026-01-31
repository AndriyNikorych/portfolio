import Apple from "@/assets/svg/apple.svg";
import css from "@css/pages/macbook.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function LoadingScreen() {
	const loadingScreenRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timeline = gsap.timeline();

		timeline
			.to(loadingScreenRef.current, { duration: 1, opacity: 0, ease: "power3.out", delay: 1 })
			.set(loadingScreenRef.current, { display: "none" });
	});

	return (
		<div className={css.loadingScreen} ref={loadingScreenRef}>
			<Apple />
			<div className={css.loadingBar} />
		</div>
	);
}
