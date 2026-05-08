import SettingsIcon from "@/assets/svg/navigationIcons/settings.svg";
import macbookCss from "@css/pages/macbook.module.scss";
import css from "@css/component/settings.module.scss";
import { useRef, useState } from "react";
import { Explorer } from "@/components/Explorer/Explorer";
import { ThemeSelector } from "@/components/ThemeSelector/ThemeSelector";
import { useTranslation } from "@/i18n/useTranslation";
import { LanguageList } from "@/components/LanguageSelector/LanguageList";
import { useRouter } from "next/navigation";
import { Config } from "@/utilities/config";

export function Settings() {
	const [open, setOpen] = useState(false);
	const iconRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const onClickBack = () => {
		setOpen(false);
		router.push(Config.navigationScheme.root);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onOpen = () => {
		setOpen(true);

		if (open) {
			document.getElementById("settings")?.focus();
		}
	};

	const t = useTranslation();

	return (
		<div className={css.settings}>
			<div className={css.iconButton} onClick={onOpen} ref={iconRef}>
				<SettingsIcon className={macbookCss.icon} />
			</div>

			{open && (
				<Explorer onClose={onClose} iconRef={iconRef} id="settings">
					<div className={css.content}>
						<header className={css.header}>
							<SettingsIcon />
							<h1 className={css.title}>{t("settings.title")}</h1>
							<h2 className={css.description}>{t("settings.description")}</h2>
						</header>

						<div className={css.block}>
							<ThemeSelector />
						</div>
						<div className={css.block}>
							<LanguageList />
						</div>

						<button type="button" onClick={onClickBack} className={css.goBackButton}>
							{t("footer.goBack")}
						</button>
					</div>
				</Explorer>
			)}
		</div>
	);
}
