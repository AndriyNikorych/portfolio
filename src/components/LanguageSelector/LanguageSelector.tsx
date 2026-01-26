import { useLocale } from "use-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { locales, AppLocale } from "@/locale/i18n/request";
import css from "@css/component/languageSelector.module.scss";
import UkraineIcon from "@/assets/svg/uk.svg";
import EnglishIcon from "@/assets/svg/en.svg";
import cn from "classnames";
import { useTranslation } from "@/locale/useTranslation";

const lang = {
	uk: {
		label: "УКР",
		name: "УКРАЇНСЬКА",
		icon: <UkraineIcon />
	},
	en: {
		label: "EN",
		name: "ENGLISH",
		icon: <EnglishIcon />
	}
};

export function LanguageSelector({ onClose }: { onClose: () => void }) {
	const locale = useLocale() as AppLocale;
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslation();
	const [open, setOpen] = useState(false);

	function switchTo(nextLocale: AppLocale) {
		if (!pathname) return;

		if (locale === nextLocale) {
			setOpen(false);
			onClose();
			return;
		}

		const segments = pathname.split("/");

		if (segments[1]) {
			segments[1] = nextLocale;
		} else {
			segments.splice(1, 0, nextLocale);
		}

		router.push(segments.join("/"));
	}

	const clickerAway = () => {
		setOpen(false);
	};

	return (
		<div className={css.languageSelector}>
			<button type="button" onClick={() => setOpen(!open)} className={css.button}>
				{lang[locale].label}
				<div className={css.icon}>{lang[locale].icon}</div>
			</button>
			{open && <div className={css.clickerAway} onClick={clickerAway} />}
			<ul className={cn(css.list, { [css.open]: open })}>
				<li className={css.label} onClick={() => switchTo(locale)}>
					{t("navigation.selectLang")}
				</li>
				{locales.map((item) => {
					return (
						<li
							className={cn(css.item, { [css.active]: locale === item })}
							onClick={() => switchTo(item)}
							key={item}
						>
							{lang[item].name}
							<div className={css.icon}>{lang[item].icon}</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
