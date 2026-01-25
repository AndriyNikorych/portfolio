import css from "@css/pages/home.module.scss";
import Link from "next/dist/client/link";
import LinkedInIcon from "@/assets/svg/linkedin.svg";
import TelegramIcon from "@/assets/svg/telegram.svg";
import GitHub from "@/assets/svg/github.svg";
import GmailIcon from "@/assets/svg/gmail.svg";

export function ContactList() {
	return (
		<ul className={css.contactsList}>
			<li className={css.contactsItem}>
				<Link href={"https://www.linkedin.com/in/andriy-nikorych-a7951a21b/"} target={"_blank"}>
					<LinkedInIcon className={css.contactsIcon} />
				</Link>
			</li>
			<li className={css.contactsItem}>
				<Link href={"https://t.me/AndriyNikorych"} target={"_blank"}>
					<TelegramIcon className={css.contactsIcon} />
				</Link>
			</li>

			<li className={css.contactsItem}>
				<Link href={"https://github.com/AndriyNikorych"} target={"_blank"}>
					<GitHub className={css.contactsIcon} />
				</Link>
			</li>

			<li className={css.contactsItem}>
				<Link href={"mailto:nikorychandriy@gmail.com"} target={"_blank"}>
					<GmailIcon className={css.contactsIcon} />
				</Link>
			</li>
		</ul>
	);
}
