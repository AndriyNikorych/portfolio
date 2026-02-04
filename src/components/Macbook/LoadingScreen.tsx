"use client";
import Apple from "@/assets/svg/apple.svg";
import css from "@css/pages/loading.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Config } from "@/utilities/config";

export function LoadingScreen() {
	const loadingScreenRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const handleLoadingComplete = () => {
		router.replace(Config.navigationScheme.macOs);
	};

	useEffect(() => {
		if (!loadingScreenRef.current) {
			handleLoadingComplete();
			return;
		}

		const timeline = gsap.timeline({
			onComplete: handleLoadingComplete
		});

		timeline.fromTo(
			loadingScreenRef.current,
			{ ["--loadingProgress"]: "-90%" },
			{ duration: 1, ["--loadingProgress"]: "0%", ease: "power3.out" }
		);
	});

	return (
		<div className={css.loadingScreen}>
			<Apple />
			<div className={css.loadingBar} ref={loadingScreenRef} />
		</div>
	);
}
