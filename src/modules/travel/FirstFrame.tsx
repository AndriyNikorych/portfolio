import css from "@/assets/styles/pages/travel.module.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowDown from "@/assets/svg/arrowDown.svg";

gsap.registerPlugin(ScrollTrigger);

const text = "Maldives";
const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 100'><text x='250' y='60' text-anchor='middle' dominant-baseline='central' font-size='100' font-weight='900' font-family='Lato, sans-serif' fill='white' stroke='white' stroke-width='5'>${text}</text></svg>`;
const maskUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;

export function FirstFrame() {
	const imageRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const hintRef = useRef<HTMLDivElement>(null);
	const hintTextRef = useRef<HTMLSpanElement>(null);
	const whiteRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperRef.current,
				start: "top top",
				end: "bottom bottom",
				scrub: 1.7
			}
		});

		ScrollTrigger.create({
			trigger: document.documentElement,
			start: "bottom bottom+=200",
			end: "bottom bottom",
			onEnter: () => gsap.to(hintRef.current, { opacity: 0, duration: 0.3 }),
			onLeaveBack: () => gsap.to(hintRef.current, { opacity: 1, duration: 0.3 })
		});

		tl.to(hintTextRef.current, { opacity: 0, animation: "none", duration: 0.01 }, 0);

		tl.fromTo(
			imageRef.current,
			{ maskSize: "94vw" },
			{
				maskSize: "2200vw",
				duration: 0.4
			}
		);
		tl.to(
			imageRef.current,
			{
				opacity: 0,
				duration: 0.1
			},
			0.3
		);
		tl.to(
			contentRef.current,
			{
				opacity: 1,
				duration: 0.1
			},
			0.2
		);

		tl.fromTo(titleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.1 }, 0.3);
		tl.fromTo(subtitleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.1 }, 0.35);
		tl.fromTo(whiteRef.current, { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.1 }, 0.8);

		return () => {
			tl.kill();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<div className={css.stickyWrapper} ref={wrapperRef}>
			<div className={css.hint} ref={hintRef}>
				<span ref={hintTextRef}>{"Scroll to explore"}</span>
				<ArrowDown />
			</div>
			<div className={css.container}>
				<div
					className={css.imageLayer}
					ref={imageRef}
					style={{
						maskImage: maskUrl,
						WebkitMaskImage: maskUrl
					}}
				/>
				<div className={css.content} ref={contentRef}>
					<div className={css.description}>
						<div className={css.title} ref={titleRef}>
							MALDIVES
						</div>
						<div className={css.subtitle} ref={subtitleRef}>
							Your personal paradise, where time stands still
						</div>
					</div>
				</div>
				<div ref={whiteRef} className={css.whiteFrame} />
			</div>
		</div>
	);
}
