import { useRef, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import css from "@css/component/settings.module.scss";
import PortfolioIcon from "@/assets/svg/navigationIcons/portfolio.svg";
import macbookCss from "@css/pages/macbook.module.scss";
import { Explorer } from "@/components/Explorer/Explorer";

export function Portfolio() {
	const [open, setOpen] = useState(false);
	const iconRef = useRef<HTMLDivElement>(null);

	const onClose = () => {
		setOpen(false);
	};

	const onOpen = () => {
		setOpen(true);

		if (open) {
			document.getElementById("portfolio")?.focus();
		}
	};

	const t = useTranslation();

	return (
		<div className={css.settings}>
			<div className={css.iconButton} onClick={onOpen} ref={iconRef}>
				<PortfolioIcon className={macbookCss.icon} />
			</div>

			{open && (
				<Explorer onClose={onClose} iconRef={iconRef} id="portfolio">
					<div className={css.content}>
						<header className={css.header}>
							<h1 className={css.title}>{t("global.noData")}</h1>
							<h2 className={css.description}>{t("global.workInProgress")}</h2>
						</header>
					</div>
				</Explorer>
			)}
		</div>
	);
}
