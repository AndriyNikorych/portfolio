import css from "@/assets/styles/pages/travel.module.scss";
import { contactList } from "@/services/contacts";
import { useSearchParams } from "next/navigation";

export function Footer() {
	const searchParams = useSearchParams();
	const showContacts = searchParams.get("c");

	return (
		<div className={css.footer}>
			<div className={css.footerContainer}>
				{showContacts && (
					<div className={css.contactInfo}>
						<h4 className={css.contactTitle}> Like what you see? Contact me:</h4>
						<div className={css.contacts}>
							{contactList.map((item) => (
								<div key={item.placeholder} className={css.contactItem}>
									{item.link}
								</div>
							))}
						</div>
					</div>
				)}

				<div className={css.footerInfo}>
					<h4 className={css.footerTitle}>Site Concept</h4>
					<div className={css.footerText}>Created by: Andrii Nikorych © 2026</div>
				</div>
			</div>
		</div>
	);
}
