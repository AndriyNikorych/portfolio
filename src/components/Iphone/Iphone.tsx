import css from "@css/pages/iphone.module.scss";
import { MobileCalendar } from "@/components/Calendar/MobileCalendar";
import { BatteryWidget } from "@/components/Battery/BatteryWidget";
import { Clock } from "@/components/Clock/Clock";
import { MobileHeader } from "@/components/Header/MobileHeader";
import { CalculatorButton } from "@/components/Calculator/CalculatorButton";
import { TravelIcon } from "@/modules/travel/TravelIcon";
import { Settings } from "@/components/Macbook/components/Settings";

export function Iphone() {
	// const searchParams = useSearchParams();
	// const showContacts = searchParams.get("c");
	//
	// const footerList = showContacts
	// 	? [...navigationList, { placeholder: "contacts", item: <Contacts /> }]
	// 	: [...navigationList];

	return (
		<div className={css.root}>
			<MobileHeader />
			<div className={css.iphone}>
				<MobileCalendar />
				<BatteryWidget isMobile />
				<Clock isMobile />
				<CalculatorButton />
				<TravelIcon />
				<Settings />
				{/*<FooterNavBar list={footerList} />*/}
			</div>
		</div>
	);
}
