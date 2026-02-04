"use client";
import css from "@css/pages/macbook.module.scss";
import { FooterNavBar } from "@/components/Macbook/components/FooterNavBar";
import { contactList, navigationList } from "@/modules/tahoe/utils";
import { Calendar } from "@/components/Calendar/Calendar";

const footerList = [...navigationList, ...contactList];

export function MacBook() {
	return (
		<div className={css.root}>
			<div className={css.macBookContainer}>
				<Calendar />
				<FooterNavBar list={footerList} />
			</div>
		</div>
	);
}
