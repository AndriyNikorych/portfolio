import { Booster } from "@/components/PackOpening/Booster";
import css from "@/assets/styles/component/packOpening.module.scss";
import { BoosterType } from "@/components/PackOpening/utils";

export function BoosterList() {
	return (
		<div className={css.boosterContainer}>
			<Booster type={BoosterType.common} />
			<Booster type={BoosterType.uncommon} />
			<Booster type={BoosterType.rare} />
			<Booster type={BoosterType.legendary} />
		</div>
	);
}
