import css from "@css/pages/questionnaire.module.scss";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
] as const;
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

type DateSelectorProps = {
	value?: string; // YYYY-MM-DD
	onChange: (next: string) => void;
	required?: boolean;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const parseValue = (value?: string) => {
	if (!value) return null;
	const [y, m, d] = value.split("-").map((x) => Number(x));
	if (!y || !m || !d) return null;
	return { y, m, d };
};

const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate(); // m: 1..12

export function DateSelector({ value, onChange, required }: DateSelectorProps) {
	const parsed = parseValue(value);

	const y = parsed?.y ?? new Date().getFullYear();
	const m = parsed?.m ?? 1;
	const d = parsed?.d ?? 1;

	const maxDay = daysInMonth(y, m);
	const days = Array.from({ length: maxDay }, (_, i) => i + 1);

	const setYear = (nextY: number) => {
		const nextMaxDay = daysInMonth(nextY, m);
		const nextD = Math.min(d, nextMaxDay);
		onChange(`${nextY}-${pad2(m)}-${pad2(nextD)}`);
	};

	const setMonth = (nextM: number) => {
		const nextMaxDay = daysInMonth(y, nextM);
		const nextD = Math.min(d, nextMaxDay);
		onChange(`${y}-${pad2(nextM)}-${pad2(nextD)}`);
	};

	const setDay = (nextD: number) => {
		onChange(`${y}-${pad2(m)}-${pad2(nextD)}`);
	};

	return (
		<div className={css.dateSelector}>
			<select
				className={css.dateSelect}
				value={d}
				onChange={(e) => setDay(Number(e.target.value))}
				required={required}
			>
				{days.map((x) => (
					<option key={x} value={x}>
						{pad2(x)}
					</option>
				))}
			</select>

			<select value={m} className={css.dateSelect} onChange={(e) => setMonth(Number(e.target.value))}>
				{months.map((label, idx) => (
					<option key={label} value={idx + 1}>
						{label}
					</option>
				))}
			</select>

			<select
				className={css.dateSelect}
				value={y}
				onChange={(e) => setYear(Number(e.target.value))}
				required={required}
			>
				{years.map((x) => (
					<option key={x} value={x}>
						{x}
					</option>
				))}
			</select>
		</div>
	);
}
