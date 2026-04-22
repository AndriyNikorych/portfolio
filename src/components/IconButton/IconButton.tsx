import css from "@css/component/iconButton.module.scss";
import { ReactNode } from "react";

type IconButtonProps = {
	icon: ReactNode;
	onClick: () => void;
	label: string;
	iconRef?: React.RefObject<HTMLButtonElement | null>;
};

export function IconButton({ icon, onClick, label, iconRef }: IconButtonProps) {
	return (
		<button className={css.iconButton} onClick={onClick} ref={iconRef}>
			{icon}
			<div className={css.label}>{label}</div>
		</button>
	);
}
