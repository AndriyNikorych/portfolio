import css from "@css/pages/Home/developmentProcess.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";

const performanceList = ["performance", "accessibility", "bestPractices", "seo"];

const RADIUS = 47;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const START_SCORE = 80;
const END_SCORE = 100;

export interface PerformanceHandle {
	animate: (tl: gsap.core.Timeline) => void;
}

export const Performance = forwardRef<PerformanceHandle>(function Performance(_, ref) {
	const t = useTranslation();
	const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
	const scoreRefs = useRef<(HTMLSpanElement | null)[]>([]);

	useImperativeHandle(ref, () => ({
		animate(tl: gsap.core.Timeline) {
			const startOffset = CIRCUMFERENCE * (1 - START_SCORE / 100);
			const endOffset = CIRCUMFERENCE * (1 - END_SCORE / 100);

			circleRefs.current.forEach((circle, i) => {
				if (!circle || !scoreRefs.current[i]) return;

				const scoreEl = scoreRefs.current[i]!;
				const obj = { score: START_SCORE };

				gsap.set(circle, {
					strokeDasharray: CIRCUMFERENCE,
					strokeDashoffset: startOffset,
					stroke: "#f5a623"
				});

				tl.to(
					circle,
					{
						strokeDashoffset: endOffset,
						stroke: "#0cce6b",
						duration: 1.5,
						ease: "power2.inOut"
					},
					i === 0 ? "+=0" : `<+=${i * 0.2}`
				);

				tl.to(
					obj,
					{
						score: END_SCORE,
						duration: 1.5,
						ease: "power2.inOut",
						onUpdate: () => {
							scoreEl.textContent = Math.round(obj.score).toString();
						}
					},
					"<"
				);
			});
		}
	}));

	return (
		<div className={css.performance}>
			<div className={css.titleWrapper}>
				<span className={css.sectionTitle}>◆ {t("global.performance")}</span>
				<span className={css.title}>{t("home.performanceTitle")}</span>
			</div>

			<ul className={css.list}>
				{performanceList.map((e, i) => (
					<li key={e} className={css.item}>
						<div className={css.graph}>
							<svg viewBox="0 0 120 120" className={css.gauge}>
								<circle
									className={css.gaugeBg}
									cx="60"
									cy="60"
									r={RADIUS}
									fill="none"
									strokeWidth="6"
								/>
								<circle
									ref={(el) => {
										circleRefs.current[i] = el;
									}}
									className={css.gaugeArc}
									cx="60"
									cy="60"
									r={RADIUS}
									fill="none"
									strokeWidth="6"
									strokeLinecap="round"
									transform="rotate(-90 60 60)"
								/>
							</svg>
							<span
								className={css.score}
								ref={(el) => {
									scoreRefs.current[i] = el;
								}}
							>
								{START_SCORE}
							</span>
						</div>
						<span>{t(`global.${e}`)}</span>
					</li>
				))}
			</ul>
		</div>
	);
});
