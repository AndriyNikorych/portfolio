import { useBattery } from "@/components/Battery/useBattery";
import Lightning from "@/assets/svg/lightning.svg";
import css from "@css/component/battery.module.scss";

export function HeaderBattery() {
	const batteryInfo = useBattery();

	if (!batteryInfo) {
		return null;
	}

	let color = "var(--typeColor)";
	if (batteryInfo?.levelPercent < 25) {
		color = "var(--redColor)";
	} else if (batteryInfo?.levelPercent < 45) {
		color = "var(--yellowColor)";
	}

	return (
		<div
			className={css.headerBattery}
			style={{ "--batteryLevel": -100 + batteryInfo?.levelPercent + "%", "--batteryColor": color }}
		>
			<div className={css.batteryLevel} />
			{batteryInfo?.charging && <Lightning className={css.lightning} />}
		</div>
	);
}
