import { ReactNode } from "react";
import { Locale, LOCALE_ENUM } from "@/i18n/config";
import UkraineIcon from "@/assets/svg/country/uk.svg";
import EnglishIcon from "@/assets/svg/country/en.svg";

type LanguageListProps = { label: string; name: string; icon: ReactNode; locale: string };

export const languagesSelectorList: Record<Locale, LanguageListProps> = {
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
