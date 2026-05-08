import css from "@css/component/calendar.module.scss";
import { RefObject, useEffect, useRef } from "react";
import { Calendar } from "@/components/Calendar/Calendar";
import gsap from "gsap";

export function OpenCalendarContainer({
	openButtonRef,
	onClose
}: {
	openButtonRef: RefObject<HTMLButtonElement | null>;
	onClose: () => void;
}) {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const timeline = useRef<gsap.core.Timeline>(null);
	const calendarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!openButtonRef.current) {
			return;
		}
		const rect = openButtonRef.current.getBoundingClientRect();
		const x = rect.left + rect.width / 2 - window.innerWidth / 2;
		const y = rect.top + rect.height / 2 - window.innerHeight / 2;

		timeline.current = gsap.timeline();
		timeline.current
			.set(calendarRef.current, { transformOrigin: `${x}px ${y}px` })
			.fromTo(calendarRef.current, { scale: 0, opacity: 0 }, { duration: 0.4, scale: 1, opacity: 1 }, 0)
			.to(closeButtonRef.current, { duration: 0.2, opacity: 1, ease: "power2.out" }, 0);
	}, []);

	return (
		<div className={css.fullScreenCalendarContainer}>
			<button className={css.closeBtn} onClick={onClose} ref={closeButtonRef} />
			<Calendar className={css.fullScreenCalendar} ref={calendarRef} />
		</div>
	);
}
