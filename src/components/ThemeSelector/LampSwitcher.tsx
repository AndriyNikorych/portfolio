import { useTheme } from "next-themes";
import css from "@css/pages/room.module.scss";
import Arrow from "@/assets/svg/curve-arrow.svg";
import { useTranslation } from "@/i18n/i18nProvider";

export enum Theme {
	light = "light",
	dark = "dark"
}

export function LampSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();
	const t = useTranslation();

	const onCLick = () => {
		setTheme(resolvedTheme === Theme.dark ? Theme.light : Theme.dark);
	};

	return (
		<div className={css.themeSelector}>
			<div className={css.text}>{t("room.changeTheme")}</div>
			<div className={css.arrow}>
				<Arrow />
			</div>
			<button onClick={onCLick} className={css.switcher} aria-label={t("room.changeTheme")} />
		</div>
	);
}
