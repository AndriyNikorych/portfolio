import { LiquidGlass } from "@/components/Liquid Glass";
import css from "@css/pages/macbook.module.scss";
import { FooterItem } from "@/components/Macbook/components/FooterItem";
import { ReactNode } from "react";

type FooterNavBarType = { list: { placeholder: string; item: ReactNode }[] };

export function FooterNavBar({ list }: FooterNavBarType) {
	return (
		<div className={css.footerNavBarContainer}>
			<LiquidGlass classes={{ root: css.footerNavBar, glassContent: css.footerGlassContent }}>
				<ul className={css.footerNavBarList}>
					{list.map((item) => (
						<FooterItem key={item.placeholder} {...item} />
					))}
				</ul>
			</LiquidGlass>
		</div>
	);
}
