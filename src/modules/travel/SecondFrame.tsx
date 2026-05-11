import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import css from "@/assets/styles/pages/travel.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function SecondFrame() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const whiteRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: "+=2000",
				pin: true,
				scrub: 0.5
			}
		});

		tl.to(whiteRef.current, { opacity: 1, duration: 0.4 });

		tl.to(frameRef.current, { opacity: 1, duration: 0.01 }, 0.3);

		tl.to(whiteRef.current, { opacity: 0, duration: 0.4 }, 0.5);

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<div ref={sectionRef} className={css.whiteFrameContainer}>
			<div ref={whiteRef} className={css.whiteFrame} />
			<Image
				ref={frameRef}
				src="/images/travel/frames/frame_0001.webp"
				alt=""
				width={1920}
				height={1080}
				className={css.frame}
			/>
		</div>
	);
}
