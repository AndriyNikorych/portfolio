import { useTheme } from "next-themes";
import css from "@css/pages/home.module.scss";
import Arrow from "@/assets/svg/curve-arrow.svg";
import { useTranslation } from "@/i18n/useTranslation";

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
			<div className={css.text}>{t("home.changeTheme")}</div>
			<div className={css.arrow}>
				<Arrow />
			</div>
			<button onClick={onCLick} className={css.switcher} />
		</div>
	);
}
