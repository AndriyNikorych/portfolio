"use client";
import css from "@css/pages/macbook.module.scss";
import { FooterNavBar } from "@/components/Macbook/components/FooterNavBar";
import { contactList, navigationList } from "@/services/contacts";
import { Calendar } from "@/components/Calendar/Calendar";
import { BatteryWidget } from "@/components/Battery/BatteryWidget";
import { Header } from "@/components/Header/Header";
import { Clock } from "@/components/Clock/Clock";
import { CalculatorButton } from "@/components/Calculator/CalculatorButton";
import { TravelIcon } from "@/modules/travel/TravelIcon";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function MacBook() {
	const searchParams = useSearchParams();
	const showContacts = searchParams.get("c");
	const footerList = useMemo(() => {
		return showContacts ? [...navigationList, ...contactList] : [...navigationList];
	}, [showContacts]);

	return (
		<div className={css.root}>
			<Header />
			<div className={css.macBookContainer}>
				<Calendar />
				<Clock />
				<BatteryWidget />
				<CalculatorButton />
				<TravelIcon />
				<FooterNavBar list={footerList} />
			</div>
		</div>
	);
}
