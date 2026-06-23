import css from "@css/pages/Home/heroSection.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import Image from "next/image";

export function Avatar() {
	const t = useTranslation();

	return (
		<div className={css.avatar}>
			<div className={css.availability}>
				<div className={css.circle} />
				<p>{t("home.availability")}</p>
			</div>
			<Image
				src={"/images/avatar-hero.webp"}
				alt={"myPhoto"}
				width={600}
				height={600}
				sizes="(max-width: 570px) 100vw, (max-width: 1024px) 100vw, 50vw"
				className={css.avatarImage}
				priority
				fetchPriority="high"
			/>
			<div className={css.experience}>
				<span className={css.experienceNumber}>{"4+"}</span>
				<p>{t("home.experience")}</p>
			</div>
		</div>
	);
}
