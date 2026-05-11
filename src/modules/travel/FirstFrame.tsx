import css from "@/assets/styles/pages/travel.module.scss";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ArrowDown from "@/assets/svg/arrowDown.svg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const text = "Maldives";

export function FirstFrame() {
	const imageRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);
	const hintRef = useRef<HTMLDivElement>(null);
	const whiteRef = useRef<HTMLDivElement>(null);

	const maskUrl = useMemo(() => {
		const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 100'><text x='250' y='60' text-anchor='middle' dominant-baseline='central' font-size='100' font-weight='900' font-family='Lato, sans-serif' fill='white' stroke='white' stroke-width='5'>${text}</text></svg>`;
		return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
	}, [text]);

	useEffect(() => {
		const cards = Array.from(cardsRef.current?.children || []);

		let cardsPlayed = false;
		const cardsTl = gsap.timeline({ paused: true });

		cards?.forEach((card, i) => {
			cardsTl.to(card, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, i * 0.15);
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperRef.current,
				start: "top top",
				end: "bottom bottom",
				scrub: 1.7,
				onUpdate: (self) => {
					if (self.progress >= 0.9 && !cardsPlayed) {
						cardsPlayed = true;
						cardsTl.restart();
					}
					if (self.progress < 0.8 && cardsPlayed) {
						cardsPlayed = false;
						cardsTl.pause(0);
					}
				}
			}
		});

		tl.to(hintRef.current, { opacity: 0, animation: "none", duration: 0.01 }, 0);
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
		tl.to(whiteRef.current, { opacity: 1, duration: 0.1 }, 0.8);

		return () => {
			tl.kill();
			cardsTl.kill();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	const handleClick = () => {
		const wrapper = wrapperRef.current;
		if (wrapper && window.scrollY < 10) {
			gsap.to(window, {
				scrollTo: wrapper.offsetTop + wrapper.offsetHeight - window.innerHeight,
				duration: 2,
				ease: "power1.out"
			});
		}
	};

	return (
		<div className={css.stickyWrapper} ref={wrapperRef}>
			<div className={css.hint}>
				<span ref={hintRef}>{"Scroll or tap to explore"}</span>
				<ArrowDown />
			</div>
			<div className={css.container} onClick={handleClick}>
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
