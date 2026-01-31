import { LiquidGlass } from "@/components/Liquid Glass";
import GitHub from "@/assets/svg/navigationIcons/github.svg";
import LinkedIn from "@/assets/svg/navigationIcons/linkedin.svg";
import TelegramIcon from "@/assets/svg/navigationIcons/telegram_color.svg";
import css from "@css/pages/macbook.module.scss";
import Link from "next/dist/client/link";
import { useTranslation } from "@/i18n/useTranslation";
import GmailIcon from "@/assets/svg/navigationIcons/gmail.svg";
import { Settings } from "@/components/Macbook/components/Settings";
import { Portfolio } from "@/components/Macbook/components/Portfolio";

const navigationList = [
	{
		placeholder: "settings",
		item: <Settings />
	},
	{
		placeholder: "portfolio",
		item: <Portfolio />
	},
	{
		placeholder: "telegram",
		item: (
			<Link href={"https://t.me/AndriyNikorych"} target={"_blank"}>
				<TelegramIcon className={css.icon} />
			</Link>
		)
	},
	{
		placeholder: "gitHub",
		item: (
			<Link href={"https://github.com/AndriyNikorych"} target={"_blank"}>
				<GitHub className={css.icon} />
			</Link>
		)
	},
	{
		placeholder: "gmail",
		item: (
			<Link href={"mailto:nikorychandriy@gmail.com"} target={"_blank"}>
				<GmailIcon className={css.icon} />
			</Link>
		)
	},
	{
		placeholder: "linkedIn",
		item: (
			<Link href={"https://www.linkedin.com/in/andriy-nikorych-a7951a21b/"} target={"_blank"}>
				<LinkedIn className={css.icon} />
			</Link>
		)
	}
];

export function FooterNavBar() {
	const t = useTranslation();

	return (
		<div className={css.footerNavBarContainer}>
			<LiquidGlass classes={{ root: css.footerNavBar, glassContent: css.footerGlassContent }}>
				<ul className={css.footerNavBarList}>
					{navigationList.map((item) => (
						<li key={item.placeholder} className={css.footerNavBarItem}>
							{item.item}
							{item.placeholder && (
								<span className={css.footerNavBarPlaceholder}>
									{t("footer." + item.placeholder)}
								</span>
							)}
						</li>
					))}
				</ul>
			</LiquidGlass>
		</div>
	);
}
