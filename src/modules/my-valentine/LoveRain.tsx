import { useEffect, useRef } from "react";
import css from "@css/pages/myValentine.module.scss";

const maxDist = 100;
const maxSnowCount = 50;
const minSnowCount = 10;

type Points = {
	x: number;
	y: number;
	z: number;
	vx: number;
	vy: number;
	xpos?: number;
	fill: string;
	dia: number;
	transparent: boolean;
};

const createPoint = (canvas: HTMLCanvasElement) => {
	const x = Math.random() * (canvas.width + maxDist) - maxDist / 2;
	const y = Math.random() * (canvas.height + maxDist) - maxDist / 2 - canvas.height;
	const z = Math.random() * 0.5 + 0.5;
	const vx = (Math.random() * 2 - 0.5) * z;
	const vy = (Math.random() * 1.5 + 1.5) * z;
	const opacity = 0.5 * Math.random() + 0.5;
	const dia = (Math.random() * 10 + 8) * z;
	return {
		x,
		y,
		z,
		vx,
		vy,
		get fill() {
			return `rgba(255,31,31, ${this.transparent ? 0 : opacity})`;
		},
		dia,
		transparent: false
	};
};

const toHeartCounter = () => {
	const c = Math.floor((maxSnowCount * window.innerWidth * window.innerHeight) / (1440 * 1024));
	if (c > maxSnowCount) {
		return maxSnowCount;
	}
	if (c < minSnowCount) {
		return minSnowCount;
	}
	return c;
};

export function HeartRain() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (canvas && ctx) {
			const points: Points[] = [];
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			for (let i = 0; i < maxSnowCount; i++) {
				points.push(createPoint(canvas));
			}

			const draw = (obj: Points) => {
				const x = obj.x;
				const y = obj.y;
				const s = obj.dia;

				ctx.beginPath();
				ctx.strokeStyle = "transparent";
				ctx.fillStyle = obj.fill ?? "red";

				ctx.moveTo(x, y + s * 0.3);
				ctx.bezierCurveTo(x - s * 0.8, y - s * 0.3, x - s * 0.9, y + s * 0.9, x, y + s * 1.2);
				ctx.bezierCurveTo(x + s * 0.9, y + s * 0.9, x + s * 0.8, y - s * 0.3, x, y + s * 0.3);

				ctx.closePath();
				ctx.fill();
			};

			const update = (obj: Points) => {
				obj.x += obj.vx;
				obj.y += obj.vy;
				if (obj.x > canvas.width + maxDist / 2) {
					obj.x = -(maxDist / 2);
				}
				if (obj.y > canvas.height + maxDist / 2) {
					obj.y = -(maxDist / 2);
				}
			};

			const pointFun = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (let i = 0; i < points.length; i++) {
					draw(points[i]);
					update(points[i]);
				}
			};

			const resizeCanvas = () => {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				const toShow = toHeartCounter();
				points.forEach((e, i) => {
					e.transparent = i >= toShow;
				});
				pointFun();
			};
			let finished = false;
			const animate = () => {
				if (finished) {
					return;
				}
				pointFun();
				requestAnimationFrame(animate);
			};
			setTimeout(() => {
				if (!finished) {
					resizeCanvas();
					animate();
				}
			}, 1500);

			window.addEventListener("resize", resizeCanvas, false);

			return () => {
				finished = true;
				window.removeEventListener("resize", resizeCanvas, false);
			};
		}
	}, []);

	return <canvas id="snow-canvas" className={css.heartRain} ref={ref} />;
}
