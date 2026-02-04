import css from "@css/pages/macbook.module.scss";
import { FooterNavBar } from "@/components/Macbook/components/FooterNavBar";
import { navigationList } from "@/modules/tahoe/utils";
import { Contacts } from "@/components/Macbook/components/Contacts";
import { MobileCalendar } from "@/components/Calendar/MobileCalendar";

const footerList = [...navigationList, { placeholder: "contacts", item: <Contacts /> }];

export function Iphone() {
	return (
		<div className={css.root}>
			<div className={css.macBookContainer}>
				<MobileCalendar />
				<FooterNavBar list={footerList} />
			</div>
		</div>
	);
}
