import { useBattery } from "@/components/Battery/useBattery";
import css from "@css/component/battery.module.scss";
import Iphone from "@/assets/svg/iphone.svg";
import MacBook from "@/assets/svg/macbook.svg";
import Lightning from "@/assets/svg/lightning.svg";
import cn from "classnames";

export function BatteryWidget({ isMobile = false }: { isMobile?: boolean }) {
	const info = useBattery();
	if (!info) return null;
	const level = Math.max(0, Math.min(100, info.levelPercent));

	const size = 60;
	const stroke = 6;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;

	const progress = level / 100;
	const dashOffset = c * (1 - progress);

	const color =
		level <= 15
			? "var(--redColor)"
			: level <= 45
				? "var(--yellowColor)"
				: "var(--chargingColor, var(--greenColor))";

	return (
		<div className={cn(css.battery, { [css.isMobile]: isMobile })}>
			<div className={css.icon}>
				<svg className={css.ring} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
					<circle className={css.track} cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
					<circle
						className={css.progress}
						cx={size / 2}
						cy={size / 2}
						r={r}
						strokeWidth={stroke}
						stroke={color}
						strokeDasharray={c}
						strokeDashoffset={dashOffset}
					/>
				</svg>
				{isMobile ? <Iphone className={css.iphone} /> : <MacBook className={css.macbook} />}
				{info.charging && <Lightning className={css.lightning} />}
			</div>

			<div className={css.label}>
				<div className={css.percent}>{level}%</div>
			</div>
		</div>
	);
}
