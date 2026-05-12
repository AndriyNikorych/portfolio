import { Settings } from "src/components/Macbook/components/Settings";
import { Portfolio } from "src/components/Macbook/components/Portfolio";
import Link from "next/dist/client/link";
import css from "src/assets/styles/pages/macbook.module.scss";
import GmailIcon from "src/assets/svg/navigationIcons/gmail.svg";
import GitHub from "src/assets/svg/navigationIcons/github.svg";
import LinkedIn from "src/assets/svg/navigationIcons/linkedin.svg";
import TelegramIcon from "src/assets/svg/navigationIcons/telegram_color.svg";

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
		),
		link: (
			<Link href={"https://t.me/AndriyNikorych"} target={"_blank"} aria-label={"Telegram"}>
				Telegram
			</Link>
		)
	},
	{
		placeholder: "gitHub",
		item: (
			<Link href={"https://github.com/AndriyNikorych"} target={"_blank"} aria-label={"GitHub"}>
				<GitHub className={css.icon} />
			</Link>
		),
		link: (
			<Link href={"https://github.com/AndriyNikorych"} target={"_blank"} aria-label={"GitHub"}>
				GitHub
			</Link>
		)
	},
	{
		placeholder: "gmail",
		item: (
			<Link href={"mailto:nikorychandriy@gmail.com"} target={"_blank"} aria-label={"Gmail"}>
				<GmailIcon className={css.icon} />
			</Link>
		),
		link: (
			<Link href={"mailto:nikorychandriy@gmail.com"} target={"_blank"} aria-label={"Gmail"}>
				Gmail
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
		),
		link: (
			<Link
				href={"https://www.linkedin.com/in/andriy-nikorych-a7951a21b/"}
				target={"_blank"}
				aria-label={"LinkedIn"}
			>
				LinkedIn
			</Link>
		)
	}
];
