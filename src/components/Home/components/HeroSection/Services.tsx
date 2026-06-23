import css from "@css/pages/Home/heroSection.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";

const services = ["premiumUI", "performance", "excellence"];

export function Services() {
	const t = useTranslation();

	return (
		<div className={css.services}>
			<span className={css.servicesTitle}>{t("home.services")}</span>
			<ul className={css.servicesList}>
				{services.map((loc) => {
					return (
						<li key={loc} className={css.service}>
							<span className={css.icon}>✦</span>
							<div className={css.serviceInfo}>
								<span className={css.serviceTitle}>{t(`home.${loc}`)}</span>
								<span className={css.serviceDescription}>{t(`home.${loc}Text`)}</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
