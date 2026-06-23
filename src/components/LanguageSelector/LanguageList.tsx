import css from "@css/component/languageList.module.scss";
import cn from "classnames";
import { useTranslation } from "@/i18n/i18nProvider";
import { Locale, LOCALE_ENUM } from "@/i18n/config";
import { useSwitchLanguage } from "@/components/LanguageSelector/useSwitchLanguage";
import { languagesSelectorList } from "@/components/LanguageSelector/utils";

const locales: Locale[] = [LOCALE_ENUM.UK, LOCALE_ENUM.EN];

export function LanguageList() {
	const t = useTranslation();
	const { switchTo, locale } = useSwitchLanguage();

	return (
		<div className={css.language}>
			<ul className={css.languageList}>
				{locales.map((lang) => {
					const langItem = languagesSelectorList[lang];

					return (
						<li
							key={langItem.name}
							onClick={() => switchTo(lang)}
							className={cn(css.item, locale === lang && css.active)}
						>
							<div>
								<span>{langItem.name}</span>
								{" - "}
								<span className={css.label}>{t(langItem.locale)}</span>
							</div>
							<div className={css.icon}>{langItem.icon}</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
