import css from "@/assets/styles/pages/travel.module.scss";
import { contactList } from "@/services/contacts";

export function Footer() {
	return (
		<div className={css.footer}>
			<div className={css.footerContainer}>
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

				<div className={css.footerInfo}>
					<h4 className={css.footerTitle}>Site Concept</h4>
					<div className={css.footerText}>Created by: Andrii Nikorych © 2026</div>
				</div>
			</div>
		</div>
	);
}
