"use client";
import css from "@css/pages/macbook.module.scss";
import { FooterNavBar } from "@/components/Macbook/components/FooterNavBar";
import { contactList, navigationList } from "@/modules/tahoe/utils";
import { Calendar } from "@/components/Calendar/Calendar";
import { BatteryWidget } from "@/components/Battery/BatteryWidget";
import { Header } from "@/components/Header/Header";
import { Clock } from "@/components/Clock/Clock";
import { CalculatorButton } from "@/components/Calculator/CalculatorButton";

const footerList = [...navigationList, ...contactList];

export function MacBook() {
	return (
		<div className={css.root}>
			<Header />
			<div className={css.macBookContainer}>
				<Calendar />
				<Clock />
				<BatteryWidget />
				<CalculatorButton />
				<FooterNavBar list={footerList} />
			</div>
		</div>
	);
}
