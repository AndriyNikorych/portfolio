import css from "@/assets/styles/component/packOpening.module.scss";
import cn from "classnames";
import Image from "next/image";
import { BoosterType, packObject } from "@/components/PackOpening/utils";
import { useState } from "react";
import { BoosterPortal } from "@/components/PackOpening/BoosterDialog";

type Props = { type: BoosterType };

export function Booster({ type }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div
				className={css.booster}
				onClick={() => setIsOpen(true)}
				style={{ ["--bg"]: packObject[type].color }}
			>
				<div className={css.boosterBgWrapper}>
					<div className={cn(css.boosterBg, css[type])} />
				</div>
				<div className={css.description}>
					<h3 className={css.name}>{type}</h3>
					<div className={css.price}>
						<Image src={"/images/packOpening/coin.png"} alt={"coin"} width={20} height={20} />
						{packObject[type].cost}
					</div>
				</div>
			</div>
			<BoosterPortal isOpen={isOpen} type={type} onClose={() => setIsOpen(false)} />
		</>
	);
}
