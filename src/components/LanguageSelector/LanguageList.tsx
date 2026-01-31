import { Locale, LOCALE_ENUM, useLocale } from "@/i18n/i18nStore";
import { useTranslation } from "@/i18n/useTranslation";
import { ReactNode } from "react";
import css from "@css/component/languageList.module.scss";
import UkraineIcon from "@/assets/svg/country/uk.svg";
import EnglishIcon from "@/assets/svg/country/en.svg";
import cn from "classnames";

type LanguageListProps = { label: string; name: string; icon: ReactNode; locale: string };

const languages: Record<Locale, LanguageListProps> = {
	[LOCALE_ENUM.UK]: {
		label: "УКР",
		name: "Українська",
		icon: <UkraineIcon />,
		locale: "lang.ukraine"
	},
	[LOCALE_ENUM.EN]: {
		label: "EN",
		name: "English",
		icon: <EnglishIcon />,
		locale: "lang.english"
	}
};

const locales: Locale[] = [LOCALE_ENUM.UK, LOCALE_ENUM.EN];

export function LanguageList() {
	const { locale, setLocale } = useLocale();
	const t = useTranslation();

	const switchTo = (nextLocale: Locale) => {
		if (locale === nextLocale) return;
		void setLocale(nextLocale);
	};

	return (
		<div className={css.language}>
			<h1 className={css.title}>{t("settings.language")}</h1>
			<ul className={css.languageList}>
				{locales.map((lang) => {
					const langItem = languages[lang];

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
