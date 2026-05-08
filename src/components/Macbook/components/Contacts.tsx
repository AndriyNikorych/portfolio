import ContactsIcon from "@/assets/svg/navigationIcons/apple-phone.svg";
import css from "@css/component/contacts.module.scss";
import { useRef } from "react";
import { LiquidGlass } from "@/components/Liquid Glass";
import { useTranslation } from "@/i18n/useTranslation";
import gsap from "gsap";
import { contactList } from "@/modules/tahoe/utils";

export function Contacts() {
	const contactsListRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);
	const blurRef = useRef<HTMLDivElement>(null);
	const timeline = useRef<gsap.core.Timeline>(null);
	const t = useTranslation();

	const setOpen = () => {
		const iconRect = iconRef.current?.getBoundingClientRect();
		const contactsRect = contactsListRef.current?.getBoundingClientRect();

		if (!iconRect || !contactsRect) return;
		if (timeline.current) timeline.current.kill();

		const x = iconRect.left - window.innerWidth / 2;
		const y = window.innerHeight - contactsRect.height - 120;

		timeline.current = gsap.timeline();
		timeline.current
			.set(contactsListRef.current, { display: "flex" })
			.fromTo(contactsListRef.current, { x: x, y: y, scale: 0.1 }, { x: 0, y: 0, scale: 1 }, 0)
			.fromTo(blurRef.current, { opacity: 0 }, { duration: 0.4, opacity: 1 }, 0.3);
	};

	const setClose = () => {
		const iconRect = iconRef.current?.getBoundingClientRect();

		if (!iconRect) return;
		if (timeline.current) timeline.current.kill();

		const x = iconRect.left - window.innerWidth / 2 + iconRect.width / 2;
		const y = window.innerHeight / 2 - iconRect.height / 2;

		timeline.current = gsap.timeline();
		timeline.current
			.to(blurRef.current, { opacity: 0 })
			.to(contactsListRef.current, { x: x, y: y, scale: 0 })
			.set(contactsListRef.current, { display: "none" });
	};

	return (
		<div>
			<div className={css.contacts} onClick={setOpen} ref={iconRef}>
				<ContactsIcon />
			</div>

			<div className={css.contactsList} ref={contactsListRef}>
				<div className={css.contactsListClose} onClick={setClose} ref={blurRef} />
				<LiquidGlass classes={{ root: css.glass, glassContent: css.glassContent }}>
					<h2 className={css.title}>{t("contacts.title")}</h2>
					<div className={css.list}>
						{contactList.map((item) => (
							<div key={item.placeholder} className={css.contactItem}>
								<div className={css.icon}>{item.item}</div>
								<div className={css.placeholder}>{t("contacts." + item.placeholder)}</div>
							</div>
						))}
					</div>
				</LiquidGlass>
			</div>
		</div>
	);
}
