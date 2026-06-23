import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "@css/pages/Home/developmentProcess.module.scss";
import { PerformanceHandle } from "@/components/Home/components/Performance";

gsap.registerPlugin(ScrollTrigger);

interface AnimationRefs {
	sectionRef: RefObject<HTMLDivElement | null>;
	messages1Ref: RefObject<HTMLDivElement | null>;
	messages2Ref: RefObject<HTMLDivElement | null>;
	step1Ref: RefObject<HTMLDivElement | null>;
	step2Ref: RefObject<HTMLDivElement | null>;
	step3Ref: RefObject<HTMLDivElement | null>;
	step4Ref: RefObject<HTMLDivElement | null>;
	step5Ref: RefObject<HTMLDivElement | null>;
	laptopRef: RefObject<HTMLDivElement | null>;
	tabletRef: RefObject<HTMLDivElement | null>;
	mobileRef: RefObject<HTMLDivElement | null>;
	performanceRef: RefObject<PerformanceHandle | null>;
	progressRef: RefObject<HTMLDivElement | null>;
	progressFillRef: RefObject<HTMLDivElement | null>;
}

type GsapSelector = (query: string) => Element[];

function animateStepTitle(tl: gsap.core.Timeline, selector: GsapSelector, offset?: string) {
	tl.to(
		selector(`.${css.stepNumber}`),
		{
			opacity: 1,
			y: 0,
			duration: 0.5,
			ease: "power2.out"
		},
		offset
	)
		.to(
			selector(`.${css.title}`),
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: "power2.out"
			},
			"-=0.2"
		)
		.to(
			selector(`.${css.subTitle}`),
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: "power2.out"
			},
			"-=0.2"
		);
}

function animateStep1(tl: gsap.core.Timeline, refs: AnimationRefs) {
	const step1 = gsap.utils.selector(refs.step1Ref);
	const messages1 = gsap.utils.selector(refs.messages1Ref);

	animateStepTitle(tl, step1);

	tl.to(
		messages1(`.${css.client} .${css.user}`),
		{
			opacity: 1,
			duration: 0.5,
			ease: "power2.out"
		},
		"+=1"
	)
		.fromTo(
			messages1(`.${css.client} .${css.message}`),
			{
				scale: 0
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: "power3.out"
			},
			"+=1"
		)
		.to(
			messages1(`.${css.dev} .${css.user}`),
			{
				opacity: 1,
				duration: 0.5,
				ease: "power2.out"
			},
			"+=5"
		)
		.fromTo(
			messages1(`.${css.dev} .${css.message}`),
			{
				scale: 0
			},
			{
				opacity: 1,
				scale: 1,
				duration: 2,
				ease: "power3.out"
			},
			"+=1.3"
		)
		.to(
			refs.step1Ref.current,
			{
				y: "-100vh",
				duration: 2,
				ease: "power2.in"
			},
			"+=0.3"
		)
		.to(refs.messages1Ref.current, { y: "-200vh", duration: 5, ease: "power2.in" }, "<");
}

function animateStep2(tl: gsap.core.Timeline, refs: AnimationRefs) {
	const step2 = gsap.utils.selector(refs.step2Ref);

	animateStepTitle(tl, step2, "+=.5");

	tl.fromTo(
		refs.laptopRef.current,
		{ "--rotateY": 60, "--brightness": 0.2 },
		{
			y: 0,
			opacity: 1,
			"--rotateY": 0,
			"--brightness": 1,
			duration: 3,
			ease: "power2.out"
		},
		"-=2"
	).to(
		refs.step2Ref.current,
		{
			y: "-100vh",
			opacity: 0,
			duration: 5
		},
		"+=2"
	);
}

function animateStep3(tl: gsap.core.Timeline, refs: AnimationRefs) {
	const step3 = gsap.utils.selector(refs.step3Ref);
	const laptop = gsap.utils.selector(refs.laptopRef);

	animateStepTitle(tl, step3, "-=2");

	tl.to(laptop(`.${css.lottieAnimation}`), { opacity: 0, duration: 2, ease: "power2.out" }, "-=.2")
		.to(laptop(`.${css.image}`), { y: "-10%", duration: 5, ease: "power2.out" }, "+=2")
		.to(laptop(`.${css.image}`), { y: 0, duration: 5, ease: "power2.out" }, "+=2")
		.to(
			refs.step3Ref.current,
			{
				y: "-100vh",
				opacity: 0,
				duration: 5
			},
			"+=2"
		);
}

function animateStep4(tl: gsap.core.Timeline, refs: AnimationRefs) {
	const step4 = gsap.utils.selector(refs.step4Ref);
	const laptop = gsap.utils.selector(refs.laptopRef);

	animateStepTitle(tl, step4, "-=2");

	tl.to(laptop(`.${css.performance}`), { opacity: 1, duration: 1 }, "-=1");

	refs.performanceRef.current?.animate(tl);

	tl.to(laptop(`.${css.performance}`), { opacity: 0, duration: 1 }, "+=.5").to(
		refs.step4Ref.current,
		{
			y: "-100vh",
			opacity: 0,
			duration: 5
		},
		"+=2"
	);
}

function animateStep5(tl: gsap.core.Timeline, refs: AnimationRefs) {
	const step5 = gsap.utils.selector(refs.step5Ref);
	const messages2 = gsap.utils.selector(refs.messages2Ref);

	animateStepTitle(tl, step5, "-=2");

	tl.to(refs.laptopRef.current, { x: -2400, duration: 10, ease: "power2.out" })
		.to(refs.tabletRef.current, { x: "-50%", duration: 5, ease: "power2.out" }, "-=9")
		.to(refs.tabletRef.current, { x: -1200, duration: 5, ease: "power2.out" })
		.to(refs.mobileRef.current, { x: "-50%", duration: 5, ease: "power2.out" }, "-=7")
		.to(
			[refs.step5Ref.current, refs.laptopRef.current, refs.mobileRef.current, refs.tabletRef.current],
			{ y: -400, duration: 5, ease: "power2.out" },
			"+=2"
		)
		.set(refs.messages2Ref.current, { position: "absolute" }, "-=5")
		.to(
			messages2(`.${css.client} .${css.user}`),
			{
				opacity: 1,
				duration: 1,
				ease: "power2.out"
			},
			"-=3"
		)
		.fromTo(
			messages2(`.${css.client} .${css.message}`),
			{ scale: 0 },
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: "power3.out"
			},
			"-=1"
		)
		.to(
			[refs.step5Ref.current, refs.laptopRef.current, refs.mobileRef.current, refs.tabletRef.current],
			{ y: "-100vh", opacity: 0, duration: 5, ease: "power2.out" },
			"+=2"
		)
		.to(refs.messages2Ref.current, { y: "-100vh", opacity: 0, duration: 15, ease: "power2.out" }, "-=4");
}

function createProgressUpdater(
	progressRef: RefObject<HTMLDivElement | null>,
	progressFillRef: RefObject<HTMLDivElement | null>
) {
	let dotsCache: Element[] | null = null;

	return (self: ScrollTrigger) => {
		const progress = Math.min(self.progress * 1.2, 1);

		if (progressFillRef.current) {
			progressFillRef.current.style.transform = `scaleX(${progress})`;
		}

		if (!dotsCache && progressRef.current) {
			dotsCache = Array.from(progressRef.current.querySelectorAll(`.${css.progressDot}`));
		}

		if (!dotsCache) return;

		for (let i = 0; i < dotsCache.length; i++) {
			const threshold = i / (dotsCache.length - 1);
			dotsCache[i].classList.toggle(css.active, progress >= threshold);
		}
	};
}

export function useDevelopmentProcessAnimation(refs: AnimationRefs) {
	useEffect(() => {
		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: `.${css.canvas}`,
				start: "top top",
				end: "+=9000",
				pin: true
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: refs.sectionRef.current,
					start: "top bottom",
					end: "+=12000",
					scrub: 1.5,
					onUpdate: createProgressUpdater(refs.progressRef, refs.progressFillRef)
				}
			});

			// step 1
			tl.to({}, { duration: 3 }); // initial delay
			animateStep1(tl, refs);
			animateStep2(tl, refs);
			animateStep3(tl, refs);
			animateStep4(tl, refs);
			animateStep5(tl, refs);
		}, refs.sectionRef);

		return () => ctx.revert();
	}, []);
}
