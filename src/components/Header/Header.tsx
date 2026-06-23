import css from "@css/component/header.module.scss";
import AppleIcon from "@/assets/svg/apple.svg";
import { useTranslation } from "@/i18n/i18nProvider";
import { HeaderBattery } from "@/components/Battery/HeaderBattery";
import { TextClock } from "@/components/Clock/TextClock";

export function Header() {
	const t = useTranslation();

	return (
		<div className={css.header}>
			<div className={css.leftBlock}>
				<AppleIcon className={css.appleIcon} />
				<div className={css.title}>{t("header.title")}</div>
				<div className={css.position}>{t("header.position")}</div>
			</div>

			<div className={css.rightBlock}>
				<HeaderBattery />
				<TextClock withDate />
			</div>
		</div>
	);
}
