"use client";
import { useTheme } from "next-themes";
import css from "@/assets/styles/component/themeSelector.module.scss";
import { useTranslation } from "@/i18n/useTranslation";
import { Theme } from "@/components/ThemeSelector/LampSwitcher";
import { Image } from "next/dist/client/image-component";
import cn from "classnames";

export function ThemeSelector() {
	const { resolvedTheme, setTheme } = useTheme();
	const t = useTranslation();

	const onClickDark = () => {
		if (resolvedTheme === Theme.light) {
			setTheme(Theme.dark);
		}
	};

	const onClickLight = () => {
		if (resolvedTheme === Theme.dark) {
			setTheme(Theme.light);
		}
	};

	return (
		<div className={css.themeSelector}>
			<h1 className={css.title}>{t("settings.theme")}</h1>
			<ul className={css.themeSelectorList}>
				<li
					onClick={onClickDark}
					className={cn(css.themeSelectorItem, resolvedTheme === Theme.dark && css.active)}
				>
					<Image
						src={"/images/tahoe_background_dark_small.webp"}
						alt="dark theme"
						width={100}
						height={100}
						className={css.themeSelectorImage}
					/>
					<div>{t("global.dark")}</div>
				</li>
				<li
					onClick={onClickLight}
					className={cn(css.themeSelectorItem, resolvedTheme === Theme.light && css.active)}
				>
					<Image
						src={"/images/tahoe_background_light_small.webp"}
						alt="dark theme"
						width={100}
						height={100}
						className={css.themeSelectorImage}
					/>
					<div>{t("global.light")}</div>
				</li>
			</ul>
		</div>
	);
}
