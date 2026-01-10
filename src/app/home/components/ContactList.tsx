import css from "@css/pages/home.module.scss";
import Link from "next/dist/client/link";
import LinkedInIcon from "@/assets/svg/linkedin-linked-in-svgrepo-com.svg";
import TelegramIcon from "@/assets/svg/telegram-svgrepo-com.svg";
import ViberIcon from "@/assets/svg/viber-chat-app-svgrepo-com.svg";
import GmailIcon from "@/assets/svg/gmail-svgrepo-com.svg";

export function ContactList() {
	return (
		<ul className={css.contactsList}>
			<li className={css.contactsItem}>
				<Link href={"#"}>
					<LinkedInIcon className={css.contactsIcon} />
				</Link>
			</li>
			<li className={css.contactsItem}>
				<Link href={"#"}>
					<TelegramIcon className={css.contactsIcon} />
				</Link>
			</li>
			<li className={css.contactsItem}>
				<Link href={"#"}>
					<ViberIcon className={css.contactsIcon} />
				</Link>
			</li>
			<li className={css.contactsItem}>
				<Link href={"#"}>
					<GmailIcon className={css.contactsIcon} />
				</Link>
			</li>
		</ul>
	);
}
