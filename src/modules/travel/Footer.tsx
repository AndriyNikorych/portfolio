import css from "@/assets/styles/pages/travel.module.scss";
import { contactList } from "@/modules/tahoe/utils";

export function Footer() {
	return (
		<div className={css.footer}>
			<div className={css.footerContainer}>
				<div className={css.left}>
					<h4>Site Concept</h4>
					<div className={css.footerText}>This is a demo layout ready for your custom content.</div>
					<div className={css.footerText}>Andrii Nikorych © 2026</div>
				</div>

				<div className={css.right}>
					<h4> Like what you see? Contact me:</h4>

					<div className={css.contacts}>
						{contactList.map((item) => (
							<div key={item.placeholder} className={css.contactItem}>
								<div className={css.icon}>{item.item}</div>
								<div className={css.placeholder}>{item.placeholder}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
