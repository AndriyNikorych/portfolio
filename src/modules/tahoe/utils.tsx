import { Settings } from "@/components/Macbook/components/Settings";
import { Portfolio } from "@/components/Macbook/components/Portfolio";
import Link from "next/dist/client/link";
import css from "@css/pages/macbook.module.scss";
import GmailIcon from "@/assets/svg/navigationIcons/gmail.svg";
import GitHub from "@/assets/svg/navigationIcons/github.svg";
import LinkedIn from "@/assets/svg/navigationIcons/linkedin.svg";
import TelegramIcon from "@/assets/svg/navigationIcons/telegram_color.svg";

export const navigationList = [
	{
		placeholder: "settings",
		item: <Settings />
	},
	{
		placeholder: "portfolio",
		item: <Portfolio />
	}
];

export const contactList = [
	{
		placeholder: "telegram",
		item: (
			<Link href={"https://t.me/AndriyNikorych"} target={"_blank"} aria-label={"Telegram"}>
				<TelegramIcon className={css.icon} />
			</Link>
		)
	},
	{
		placeholder: "gitHub",
		item: (
			<Link href={"https://github.com/AndriyNikorych"} target={"_blank"} aria-label={"GitHub"}>
				<GitHub className={css.icon} />
			</Link>
		)
	},
	{
		placeholder: "gmail",
		item: (
			<Link href={"mailto:nikorychandriy@gmail.com"} target={"_blank"} aria-label={"Gmail"}>
				<GmailIcon className={css.icon} />
			</Link>
		)
	},
	{
		placeholder: "linkedIn",
		item: (
			<Link
				href={"https://www.linkedin.com/in/andriy-nikorych-a7951a21b/"}
				target={"_blank"}
				aria-label={"LinkedIn"}
			>
				<LinkedIn className={css.icon} />
			</Link>
		)
	}
];
