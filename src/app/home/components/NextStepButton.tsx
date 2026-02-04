import css from "@css/pages/home.module.scss";
import { RefObject, useRef, MouseEvent, useEffect } from "react";
import gsap from "gsap";
import { useTranslation } from "@/i18n/useTranslation";
import { useRouter } from "next/navigation";
import { Config } from "@/utilities/config";

export function NextStepButton({ homeRef }: { homeRef: RefObject<HTMLDivElement | null> }) {
	const timeline = useRef<gsap.core.Timeline>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const t = useTranslation();
	const router = useRouter();

	const handleLoadingComplete = () => {
		router.push(Config.navigationScheme.loading);
	};

	useEffect(() => {
		if (timeline.current) {
			return () => {
				timeline?.current?.kill();
			};
		}
	}, []);

	const handleContinue = (el: MouseEvent<HTMLButtonElement>) => {
		if (!homeRef?.current || !buttonRef.current) {
			handleLoadingComplete();
			return;
		}

		const rect = el.currentTarget.getBoundingClientRect();
		const home = homeRef.current;
		const homeRect = home.getBoundingClientRect();
		const x = homeRect.left - rect.left + homeRect.width / 2 - rect.width / 2;
		const y = homeRect.top + homeRect.height / 2 - rect.top - rect.height / 2;

		timeline.current = gsap.timeline({
			ease: "power3.out",
			onComplete: handleLoadingComplete
		});
		timeline.current
			.to(
				home,
				{
					duration: 1,
					z: 99,
					x: x,
					y: y
				},
				0
			)
			.to(textRef.current, { duration: 0.5, y: -30, opacity: 0 }, 0)
			.to(buttonRef.current, { duration: 1, background: "#000" }, 0.5);
	};

	return (
		<div className={css.laptop} ref={buttonRef}>
			<span className={css.laptopText} ref={textRef}>
				{t("home.continue")}
			</span>
			<button onClick={handleContinue} className={css.laptopButton} />
		</div>
	);
}
