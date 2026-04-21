import css from "@css/component/iconButton.module.scss";
import { ReactNode } from "react";

type IconButtonProps = {
	icon: ReactNode;
	onClick: () => void;
	label: string;
	iconRef?: React.RefObject<HTMLDivElement | null>;
};

export function IconButton({ icon, onClick, label, iconRef }: IconButtonProps) {
	return (
		<div className={css.iconButton} onClick={onClick} ref={iconRef}>
			{icon}
			<div className={css.label}>{label}</div>
		</div>
	);
}
