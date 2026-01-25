import css from "@css/pages/home.module.scss";
import { useTranslation } from "@/locale/useTranslation";

function fullYearsSinceOct12_2021(now = new Date()) {
	const start = new Date(2021, 9, 12); // 9 = October (0-based)
	let years = now.getFullYear() - start.getFullYear();

	const hasHadAnniversaryThisYear =
		now.getMonth() > start.getMonth() ||
		(now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());

	if (!hasHadAnniversaryThisYear) years -= 1;

	return years;
}

export function AboutMe() {
	const years = fullYearsSinceOct12_2021();
	const t = useTranslation("home");

	return (
		<div className={css.description}>
			<p>{t("description1", { years })}</p>

			<p>{t("description2")}</p>
		</div>
	);
}
