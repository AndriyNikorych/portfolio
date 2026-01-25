import { LanguageSelector } from "@/components/LanguageSelector/LanguageSelector";
import { ThemeSwitcher } from "@/components/ThemeSelector/ThemeSwitcher";
import css from "@css/component/header.module.scss";

export function Settings() {
	return (
		<div className={css.settings}>
			<LanguageSelector />
			<ThemeSwitcher />
		</div>
	);
}
