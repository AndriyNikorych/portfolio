import css from "@css/pages/myValentine.module.scss";
import { useEffect, useRef, useState } from "react";
import { Image } from "next/dist/client/image-component";
import cn from "classnames";
import { formatDateDDMMYY } from "@/modules/my-valentine/utils";

type LoveCardProps = {
	womanName: string;
	manName: string;
	imageSrc?: string;
	startingDate: number;
};

export function LoveCard({
	womanName,
	manName,
	imageSrc = "/images/valentine-day.webp",
	startingDate
}: LoveCardProps) {
	const [seconds, setSeconds] = useState<number | null>(null);

	const [rotation, setRotation] = useState(0);
	const [dragging, setDragging] = useState(false);

	const rotationRef = useRef(0);
	const startXRef = useRef(0);
	const startRotRef = useRef(0);
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tick = () => setSeconds(Math.floor((Date.now() - startingDate) / 1000));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, [startingDate]);

	const applyRotation = (deg: number) => {
		if (cardRef.current) {
			cardRef.current.style.transform = `translateZ(10px) rotateY(${deg}deg)`;
		}
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.preventDefault();
		(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

		startXRef.current = e.clientX;
		startRotRef.current = rotationRef.current;
		setDragging(true);
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragging) return;

		const dx = e.clientX - startXRef.current;
		const speed = 0.35;

		const next = startRotRef.current + dx * speed; // без обмежень
		rotationRef.current = next;

		applyRotation(next);
	};

	const finish = () => {
		if (!dragging) return;
		setDragging(false);

		const current = rotationRef.current;
		const target = Math.round(current / 180) * 180;

		rotationRef.current = target;
		setRotation(target);
		applyRotation(target);
	};

	const formatedDate = formatDateDDMMYY(startingDate);

	return (
		<div
			className={cn(css.card, dragging && css.cardDragging)}
			ref={cardRef}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={finish}
			onPointerCancel={finish}
			onLostPointerCapture={finish}
			style={{ transform: `rotateY(${rotation}deg)` }}
		>
			<div className={css.frontSide}>
				<Image src={imageSrc} alt={"photo"} width={600} height={340} className={css.photo} />
				<div className={css.startingDate}>{formatedDate}</div>
				<div className={css.turnText}>Turn me over</div>
			</div>
			<div className={css.backSide}>
				<div className={css.letterText}>
					<p>{"You feel like home to me"}</p>
					<p>{`${womanName} & ${manName} - now and always`}</p>
					{seconds && (
						<div className={css.secondsContainer}>
							{"Every "}
							<div className={css.seconds}>{seconds}</div>
							{` seconds with you - pure bliss.`}
						</div>
					)}
					<p>{"With all my love."}</p>
				</div>
			</div>
		</div>
	);
}
