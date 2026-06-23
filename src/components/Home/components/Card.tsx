import css from "@css/pages/Home/home.module.scss";
import { ReactNode } from "react";
import cn from "classnames";

type CardsProps = {
	children: ReactNode;
	className?: string;
	withGradient?: boolean;
};

export function Card({ children, className, withGradient = false }: CardsProps) {
	return <div className={cn(className, css.card, withGradient && css.withGradient)}>{children}</div>;
}
