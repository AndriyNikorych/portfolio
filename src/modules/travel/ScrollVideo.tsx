import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "@/assets/styles/pages/travel.module.scss";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 75; // кількість кадрів

function getFrameSrc(index: number) {
	return `/images/travel/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;
}

export function VideoScrollSection() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		const images: HTMLImageElement[] = [];
		const frameObj = { current: 0 };

		for (let i = 0; i < FRAME_COUNT; i++) {
			const img = new Image();
			img.src = getFrameSrc(i);
			images.push(img);
		}

		function render() {
			const img = images[Math.round(frameObj.current)];
			if (img?.complete) {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0);
			}
		}

		images[0].onload = render;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperRef.current,
				start: "top top",
				end: "+=3500",
				pin: true,
				scrub: 0.5
			}
		});

		tl.to(overlayRef.current, { opacity: 0, duration: 0.05 }, 0);

		tl.to(
			frameObj,
			{
				current: FRAME_COUNT - 1,
				ease: "none",
				duration: 0.8,
				onUpdate: render
			},
			0.2
		);

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<div ref={wrapperRef} className={css.videoWrapper}>
			<canvas ref={canvasRef} className={css.canvas} />
			<div ref={overlayRef} className={css.canvasOverlay} />
		</div>
	);
}
