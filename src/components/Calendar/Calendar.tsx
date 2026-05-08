import css from "@css/component/calendar.module.scss";
import cn from "classnames";
import { RefObject, useMemo, useState } from "react";
import { useLocale } from "@/i18n/i18nStore";

type CalendarProps = {
	value?: Date;
	onChange?: (date: Date) => void;
	locale?: string;
	className?: string;
	ref?: RefObject<HTMLDivElement | null>;
};

export function startOfDay(d: Date) {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
	);
}

function addMonths(date: Date, delta: number) {
	return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function daysInMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function weekdayIndexMondayFirst(date: Date) {
	const js = date.getDay(); // Sun=0..Sat=6
	return (js + 6) % 7;
}

export function Calendar({ onChange, className, ref }: CalendarProps) {
	const { fullLocale: locale } = useLocale();
	const today = useMemo(() => startOfDay(new Date()), []);
	const [selected, setSelected] = useState<Date>(() => startOfDay(new Date()));
	const [viewMonth, setViewMonth] = useState<Date>(
		() => new Date(selected.getFullYear(), selected.getMonth(), 1)
	);

	const monthLabel = useMemo(() => {
		return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(viewMonth);
	}, [locale, viewMonth]);

	const weekdays = useMemo(() => {
		const base = new Date(2024, 0, 1); // Monday
		return Array.from({ length: 7 }, (_, i) => {
			const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
			return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
		});
	}, [locale]);

	const cells = useMemo(() => {
		const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
		const leading = weekdayIndexMondayFirst(first);
		const dim = daysInMonth(viewMonth);

		const prevMonth = addMonths(viewMonth, -1);
		const prevDim = daysInMonth(prevMonth);

		const total = 42; // 6 rows (Apple-like stable height)
		const result: { date: Date; outside: boolean }[] = [];

		for (let i = 0; i < total; i++) {
			const dayNumber = i - leading + 1;
			if (dayNumber <= 0) {
				const d = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevDim + dayNumber);
				result.push({ date: startOfDay(d), outside: true });
			} else if (dayNumber > dim) {
				const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), dayNumber);
				result.push({ date: startOfDay(d), outside: true });
			} else {
				const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), dayNumber);
				result.push({ date: startOfDay(d), outside: false });
			}
		}

		return result;
	}, [viewMonth]);

	const handlePick = (d: Date) => {
		setSelected(d);
		onChange?.(d);

		if (d.getMonth() !== viewMonth.getMonth() || d.getFullYear() !== viewMonth.getFullYear()) {
			setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
		}
	};

	return (
		<div className={cn(className, css.calendar)} ref={ref}>
			<div className={css.card}>
				<div className={css.header}>
					<div className={css.monthTitle}>
						{monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
					</div>

					<div className={css.controls}>
						<button
							className={css.iconBtn}
							onClick={() => setViewMonth((m) => addMonths(m, -1))}
							aria-label="Prev month"
						>
							‹
						</button>
						<button
							className={css.iconBtn}
							onClick={() => setViewMonth((m) => addMonths(m, 1))}
							aria-label="Next month"
						>
							›
						</button>
					</div>
				</div>

				<div className={css.weekdays}>
					{weekdays.map((w) => (
						<div key={w} className={css.weekday}>
							{w}
						</div>
					))}
				</div>

				<div className={css.grid}>
					{cells.map(({ date, outside }) => {
						const isToday = isSameDay(date, today);
						const isSelected = isSameDay(date, selected);

						return (
							<button
								key={date.toISOString()}
								type="button"
								className={cn(
									css.dayBtn,
									outside && css.outside,
									isToday && css.today,
									isSelected && css.selected
								)}
								onClick={() => handlePick(date)}
								aria-label={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(
									date
								)}
							>
								<span className={css.dayText}>{date.getDate()}</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
