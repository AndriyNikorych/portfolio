import css from "@css/component/iconButton.module.scss";
import { ReactNode } from "react";
import cn from "classnames";

type IconButtonProps = {
	icon: ReactNode;
	onClick: () => void;
	label: string;
	className?: string;
	iconRef?: React.RefObject<HTMLButtonElement | null>;
};

export function IconButton({ icon, onClick, label, iconRef, className }: IconButtonProps) {
	return (
		<button className={cn(css.iconButton, className)} onClick={onClick} ref={iconRef} aria-label={label}>
			<div className={css.iconWrapper}>{icon}</div>

			<div className={css.label}>{label}</div>
		</button>
	);
}
