import { HeaderBattery } from "@/components/Battery/HeaderBattery";
import css from "@css/component/header.module.scss";
import { TextClock } from "@/components/Clock/TextClock";

export function MobileHeader() {
	return (
		<div className={css.mobileHeader}>
			<TextClock />
			<HeaderBattery />
		</div>
	);
}
