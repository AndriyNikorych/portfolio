import css from "@css/component/calendar.module.scss";
import { useMemo, useRef, useState } from "react";
import { useLocale } from "@/i18n/i18nStore";
import { useTranslation } from "@/i18n/useTranslation";
import { OpenCalendarContainer } from "@/components/Calendar/OpenCalendarContainer";

export function MobileCalendar() {
	const { fullLocale: locale } = useLocale();
	const t = useTranslation();
	const date = new Date();
	const day = date.getDate();
	const [open, setOpen] = useState(false);
	const openButtonRef = useRef<HTMLButtonElement>(null);

	const weekdayLabel = useMemo(() => {
		return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
	}, [locale]);

	const onOpen = () => {
		setOpen(true);
	};

	return (
		<div className={css.mobileCalendar}>
			<button className={css.calendarBtn} onClick={onOpen} ref={openButtonRef}>
				<div className={css.month}>{weekdayLabel}</div>
				<div className={css.day}>{day}</div>
			</button>
			<div className={css.label}>{t("app.calendar")}</div>

			{open && <OpenCalendarContainer openButtonRef={openButtonRef} onClose={() => setOpen(false)} />}
		</div>
	);
}
