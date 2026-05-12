import css from "@css/pages/iphone.module.scss";
import { FooterNavBar } from "@/components/Macbook/components/FooterNavBar";
import { navigationList } from "@/services/contacts";
import { Contacts } from "@/components/Macbook/components/Contacts";
import { MobileCalendar } from "@/components/Calendar/MobileCalendar";
import { BatteryWidget } from "@/components/Battery/BatteryWidget";
import { Clock } from "@/components/Clock/Clock";
import { MobileHeader } from "@/components/Header/MobileHeader";
import { CalculatorButton } from "@/components/Calculator/CalculatorButton";
import { TravelIcon } from "@/modules/travel/TravelIcon";

const footerList = [...navigationList, { placeholder: "contacts", item: <Contacts /> }];

export function Iphone() {
	return (
		<div className={css.root}>
			<MobileHeader />
			<div className={css.iphone}>
				<MobileCalendar />
				<BatteryWidget isMobile />
				<Clock isMobile />
				<CalculatorButton />
				<TravelIcon />
				<FooterNavBar list={footerList} />
			</div>
		</div>
	);
}
