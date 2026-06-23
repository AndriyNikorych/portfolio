import css from "@css/component/languageList.module.scss";
import cn from "classnames";
import { useSwitchLanguage } from "@/components/LanguageSelector/useSwitchLanguage";

export function LanguageSwitcher({ className }: { className?: string }) {
	const { switchTo, locale } = useSwitchLanguage();

	return (
		<div className={cn(className, css.languageSelector)}>
			<button
				className={cn(css.lang, locale === "en" && css.active)}
				onClick={() => switchTo("en")}
				aria-label={"English"}
			>
				EN
			</button>
			|
			<button
				className={cn(css.lang, locale === "uk" && css.active)}
				onClick={() => switchTo("uk")}
				aria-label={"Ukrainian"}
			>
				UA
			</button>
		</div>
	);
}
