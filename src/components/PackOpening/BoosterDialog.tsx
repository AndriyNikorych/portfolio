import { BoosterType, packObject } from "@/components/PackOpening/utils";
import css from "@/assets/styles/component/packOpening.module.scss";
import { usePortal } from "@/hooks/usePortal";
import cn from "classnames";
import Image from "next/image";
import { RouletteContent } from "@/components/PackOpening/AvatarRoulette";
import { useEffect, useRef, useState } from "react";
import { useCollection } from "@/components/PackOpening/CollenctionContext";
import { AvatarList } from "@/components/PackOpening/AvatarList";
import gsap from "gsap";

export function BoosterPortal({
	isOpen,
	onClose,
	type
}: {
	isOpen: boolean;
	onClose: () => void;
	type: BoosterType;
}) {
	return usePortal(isOpen ? <BoosterDialog onClose={onClose} type={type} /> : null);
}

function BoosterDialog({ onClose, type }: { onClose: () => void; type: BoosterType }) {
	const [open, setOpen] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState("");
	const { balance, setBalance } = useCollection();

	const onOpen = () => {
		setOpen(true);
		setBalance(balance - packObject[type].cost);
	};

	const boosterBgRef = useRef<HTMLDivElement>(null);

	const avatarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!avatarRef.current || !selectedAvatar) return;

		gsap.fromTo(
			avatarRef.current,
			{ opacity: 0, scale: 0.85 },
			{ opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
		);
	}, [selectedAvatar]);

	useEffect(() => {
		if (!boosterBgRef.current) return;

		if (selectedAvatar) {
			gsap.to(boosterBgRef.current, { opacity: 0, duration: 0.3 });

			const tl = gsap.delayedCall(3, () => {
				gsap.to(boosterBgRef.current, { opacity: 1, duration: 0.3 });
			});

			return () => {
				tl.kill();
			};
		} else {
			gsap.to(boosterBgRef.current, { opacity: 1, duration: 0.3 });
		}
	}, [selectedAvatar]);

	return (
		<div className={css.dialogWrapper}>
			<div className={css.overlay} onClick={onClose} />
			<div className={css.dialog} style={{ ["--bg"]: packObject[type].color }}>
				<div className={css.dialogHeader}>
					<h3 className={css.title}>{type}</h3>
					<div className={css.close} onClick={onClose}>
						Close
					</div>
				</div>
				<div className={css.content}>
					<div className={css.boosterBgWrapper}>
						<div className={cn(css.boosterBg, css[type])} ref={boosterBgRef} />
						{selectedAvatar && (
							<div className={css.selectedAvatarWrapper} ref={avatarRef}>
								<Image
									src={selectedAvatar}
									alt={"preview"}
									width={1000}
									height={1000}
									className={css.selectedAvatar}
								/>
							</div>
						)}
					</div>

					<div className={css.info}>
						<div className={css.chances}>
							<p className={css.title}>Drop Chance</p>
							{Object.entries(packObject[type].chances).map(([key, value]) => (
								<div
									key={key}
									className={cn(css.chance, css[key])}
									style={{ ["--value"]: value }}
								>
									<div className={cn(css.chanceType)}>{key + ":"}</div>
									<div className={css.visualChance} />
									{value}%
								</div>
							))}
						</div>
						<button className={css.button} onClick={() => onOpen()}>
							<Image src={"/images/packOpening/coin.png"} alt={"coin"} width={20} height={20} />
							{packObject[type].cost}
						</button>

						<AvatarList setSelectedAvatar={setSelectedAvatar} />
					</div>
				</div>
			</div>

			{open && <RouletteContent type={type} onClose={() => setOpen(false)} />}
		</div>
	);
}
