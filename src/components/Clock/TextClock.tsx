import { useEffect, useState } from "react";
import css from "@css/component/clock.module.scss";
import { useLocale } from "@/i18n/i18nProvider";

export function TextClock({ withDate = false }: { withDate?: boolean }) {
	const [time, setTime] = useState(new Date());
	const { fullLocale: locale } = useLocale();

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 30000);
		return () => clearInterval(interval);
	}, []);

	if (withDate) {
		const fullDate = new Intl.DateTimeFormat(locale, {
			weekday: "short",
			day: "2-digit",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		})
			.format(time)
			.replaceAll(",", "");

		return <div className={css.textClock}>{fullDate}</div>;
	}

	const fullDate = new Intl.DateTimeFormat(locale, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	})
		.format(time)
		.replaceAll(",", "");

	return <div className={css.textClock}>{fullDate}</div>;
}
