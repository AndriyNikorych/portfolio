import SettingsIcon from "@/assets/svg/navigationIcons/settings.svg";
import css from "@css/component/settings.module.scss";
import { useRef } from "react";
import { Explorer } from "@/components/Explorer/Explorer";
import { ThemeSelector } from "@/components/ThemeSelector/ThemeSelector";
import { useTranslation } from "@/i18n/i18nProvider";
import { LanguageList } from "@/components/LanguageSelector/LanguageList";
import { useRouter } from "next/navigation";
import { Config } from "@/utilities/config";
import { closeExplorer, openExplorer, useExplorerOpen } from "@/stores/explorerStore";
import { IconButton } from "@/components/IconButton/IconButton";

export function Settings() {
	const open = useExplorerOpen("settings");
	const iconRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const wasOpenOnMount = useRef(open);

	const onClickBack = () => {
		closeExplorer("settings");
		router.push(Config.navigationScheme.room);
	};

	const onClose = () => {
		closeExplorer("settings");
		wasOpenOnMount.current = false;
	};

	const onOpen = () => {
		openExplorer("settings");

		if (open) {
			document.getElementById("settings")?.focus();
		}
	};

	const t = useTranslation();

	return (
		<div className={css.settings}>
			<IconButton
				icon={<SettingsIcon className={css.icon} ref={iconRef} />}
				onClick={onOpen}
				className={css.iconButton}
				label={t("app.settings")}
			/>

			{open && (
				<Explorer
					onClose={onClose}
					iconRef={iconRef}
					id="settings"
					skipAnimation={wasOpenOnMount.current}
				>
					<div className={css.content}>
						<header className={css.header}>
							<SettingsIcon />
							<h3 className={css.title}>{t("settings.title")}</h3>
							<h5 className={css.description}>{t("settings.description")}</h5>
						</header>

						<div className={css.block}>
							<ThemeSelector />
						</div>
						<div className={css.block}>
							<h5 className={css.title}>{t("settings.language")}</h5>
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
