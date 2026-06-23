import { useEffect, useRef } from "react";
import css from "@/assets/styles/component/packOpening.module.scss";
import gsap from "gsap";
import Image from "next/image";
import { BoosterType, generateWeightedAvatars } from "@/components/PackOpening/utils";
import { useCollection } from "@/components/PackOpening/CollenctionContext";

interface AvatarRouletteProps {
	type: BoosterType;
	isOpen?: boolean;
	onClose: () => void;
}

const maxEl = 50;

export function RouletteContent({ type, onClose }: AvatarRouletteProps) {
	const stripRef = useRef<HTMLDivElement>(null);
	const avatars = useRef(generateWeightedAvatars(type, maxEl));
	const { addAvatar } = useCollection();
	const added = useRef(false);

	useEffect(() => {
		if (!stripRef.current) return;

		const itemWidth = 300;
		const fitCount = Math.ceil(window.innerWidth / itemWidth);
		const startIndex = fitCount + 1;
		const targetIndex = maxEl - fitCount;
		const totalScroll = targetIndex * itemWidth + 150;
		const startOffset = startIndex * itemWidth;

		gsap.set(stripRef.current, { x: -startOffset });
		const wonSrc = avatars.current[targetIndex];
		if (!added.current) {
			addAvatar(wonSrc);
			added.current = true;
		}

		const tl = gsap.timeline();

		tl.to(stripRef.current, {
			x: -totalScroll,
			duration: 4,
			ease: "power4.out"
		}).call(
			() => {
				onClose();
			},
			undefined,
			"+=.3"
		);

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div className={css.rouletteOverlay} onClick={onClose}>
			<div className={css.rouletteContainer} onClick={(e) => e.stopPropagation()}>
				<div className={css.rouletteWindow}>
					<div className={css.roulettePointer} />
					<div className={css.rouletteStrip} ref={stripRef}>
						{avatars.current.map((item, i) => (
							<div key={i} className={css.rouletteItem}>
								<Image src={item.src} alt={`avatar-${i}`} width={250} height={250} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
