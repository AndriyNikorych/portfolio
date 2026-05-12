import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "@/assets/styles/pages/travel.module.scss";
import cn from "classnames";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 75; // кількість кадрів

function getFrameSrc(index: number) {
	return `/images/travel/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;
}

export function VideoScrollSection() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const overlayStartRef = useRef<HTMLDivElement>(null);
	const overlayEndRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d")!;

		const gsapCtx = gsap.context(() => {
			const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, () => new Image());
			const frameObj = { current: 0 };

			for (let i = 0; i < FRAME_COUNT; i++) {
				const img = new Image();
				img.src = getFrameSrc(i);
				images.push(img);
			}

			function render() {
				const img = images[Math.round(frameObj.current)];
				if (img?.complete && canvas) {
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0);
				}
			}

			const priority = [0, Math.floor(FRAME_COUNT / 2), FRAME_COUNT - 1];
			priority.forEach((i) => (images[i].src = getFrameSrc(i)));
			images[0].onload = render;

			(typeof requestIdleCallback !== "undefined"
				? requestIdleCallback
				: (cb: IdleRequestCallback) => setTimeout(cb, 1))(() => {
				for (let i = 0; i < FRAME_COUNT; i++) {
					if (!priority.includes(i)) images[i].src = getFrameSrc(i);
				}
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: wrapperRef.current,
					start: "top top",
					end: "+=3500",
					pin: true,
					scrub: 0.5
				}
			});

			tl.fromTo(
				overlayStartRef.current,
				{ opacity: 1, y: -20 },
				{ opacity: 0, y: 0, duration: 0.05 },
				0
			);
			tl.to(frameObj, { current: FRAME_COUNT - 1, ease: "none", duration: 0.8, onUpdate: render }, 0.1);
			tl.fromTo(
				textRef.current,
				{ y: "100vh", opacity: 0 },
				{ y: "0", opacity: 1, duration: 0.5, ease: "power2.out" },
				0.2
			);
			tl.fromTo(overlayEndRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.8);
		}, wrapperRef);

		return () => gsapCtx.revert();
	}, []);

	return (
		<div ref={wrapperRef} className={css.videoWrapper}>
			<canvas ref={canvasRef} className={css.canvas} />
			<div ref={overlayStartRef} className={cn(css.whiteFrame, css.overlayStart)} />
			<div ref={textRef} className={css.videoText}>
				Discover the endless blue of the Indian Ocean.
			</div>
			<div ref={overlayEndRef} className={css.whiteFrame} />
		</div>
	);
}
