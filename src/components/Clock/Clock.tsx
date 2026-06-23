import css from "@css/component/clock.module.scss";
import { useEffect, useState } from "react";
import cn from "classnames";

const numbers = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

export function Clock({ isMobile = false }: { isMobile?: boolean }) {
	const [date, setDate] = useState<Date | null>(null);
	useEffect(() => setDate(new Date()), []);
	const hours = date?.getHours() ?? 0;
	const minutes = date?.getMinutes() ?? 0;
	const seconds = date?.getSeconds() ?? 0;

	return (
		<div className={cn(css.clockContainer, { [css.isMobile]: isMobile })}>
			<div className={css.clock}>
				{numbers.map((number, idx) => (
					<div key={number} className={css.number} style={{ ["--angle" as any]: `${idx * 30}deg` }}>
						{number}
					</div>
				))}
				<div
					className={css.minHand}
					style={{ ["--angle" as any]: `${(minutes + seconds / 60) * 6}deg` }}
				/>
				<div
					className={css.hourHand}
					style={{ ["--angle" as any]: `${hours * 30 + minutes / 2}deg` }}
				/>
				<div className={css.secHand} style={{ ["--angle" as any]: `${seconds * 6}deg` }} />
			</div>
		</div>
	);
}
