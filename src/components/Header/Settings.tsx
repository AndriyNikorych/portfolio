import { LanguageSelector } from "@/components/LanguageSelector/LanguageSelector";
import { ThemeSwitcher } from "@/components/ThemeSelector/ThemeSwitcher";
import css from "@css/component/header.module.scss";

export function Settings({ onClose }: { onClose: () => void }) {
	return (
		<div className={css.settings}>
			<LanguageSelector onClose={onClose} />
			<ThemeSwitcher onClose={onClose} />
		</div>
	);
}
