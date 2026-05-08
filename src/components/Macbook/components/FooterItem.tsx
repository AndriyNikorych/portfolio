import css from "@css/pages/macbook.module.scss";
import { ReactNode } from "react";
import { useTranslation } from "@/i18n/useTranslation";

type FooterItemProps = {
	placeholder: string;
	item: ReactNode;
};

export function FooterItem(item: FooterItemProps) {
	const t = useTranslation();
	return (
		<li key={item.placeholder} className={css.footerNavBarItem}>
			{item.item}
			{item.placeholder && (
				<span className={css.footerNavBarPlaceholder}>{t("footer." + item.placeholder)}</span>
			)}
		</li>
	);
}
