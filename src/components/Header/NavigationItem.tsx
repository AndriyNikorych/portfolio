import css from "@css/component/header.module.scss";
import Link from "next/dist/client/link";
import { ReactNode } from "react";

export function NavigationItem({ url, title, icon }: { url: string; title?: string; icon?: ReactNode }) {
	return (
		<li className={css.menuItem}>
			<Link href={url} className={css.menuItem}>
				{title}
				{icon}
			</Link>
		</li>
	);
}
