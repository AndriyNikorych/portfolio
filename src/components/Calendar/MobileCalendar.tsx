import css from "@css/component/calendar.module.scss";
import { useMemo, useRef, useState } from "react";
import { useLocale } from "@/i18n/i18nProvider";
import { useTranslation } from "@/i18n/i18nProvider";
import { OpenCalendarContainer } from "@/components/Calendar/OpenCalendarContainer";
import { IconButton } from "@/components/IconButton/IconButton";

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
			<IconButton
				icon={
					<div className={css.calendarBtn}>
						<div className={css.month}>{weekdayLabel}</div>
						<div className={css.day}>{day}</div>
					</div>
				}
				onClick={onOpen}
				label={t("app.calendar")}
			/>

			{open && <OpenCalendarContainer openButtonRef={openButtonRef} onClose={() => setOpen(false)} />}
		</div>
	);
}
