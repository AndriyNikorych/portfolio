import css from "@css/pages/home.module.scss";
import { useTranslation } from "@/i18n/useTranslation";

export function HomePageContent() {
	const t = useTranslation();

	return (
		<div className={css.content}>
			<div className={css.hello}>{t("home.hello")}</div>
			<div className={css.title}>
				<h1 className={css.name}>{t("home.name")}</h1>
				<h1 className={css.surname}>{t("home.surname")}</h1>
			</div>

			<div className={css.description}>{t("home.description")}</div>
		</div>
	);
}
